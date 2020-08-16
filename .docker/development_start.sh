#!/bin/bash

# assign SCRIPT_DIR and ROOT_DIR
if [[ "$OSTYPE" == "darwin"* ]]; then
    # MacOS
    echo "MacOS detected"
    export SCRIPT_DIR=$(cd "$(dirname "$0")"; pwd)
else
    # Linux
    echo "Linux OS detected"
    export SCRIPT_DIR=$(dirname $(readlink -f $0))
fi
export ROOT_DIR=$(realpath "${SCRIPT_DIR}/..")

# get our arguments
POSITIONAL=()
COMMANDS=()
MODULE_ID=""
BUILD=""
CONTAINER_TARGET=""
CONTAINER_WORKDIR=""

while [[ $# -gt 0 ]]
do
    key="$1"

    case $key in
        --build)
        BUILD="--build --remove-orphans --force-recreate"
        shift # past argument
        ;;

        -c|--command)
        shift # past argument
        SHELL_COMMAND=$1
        shift # past argument
        ;;

        --debug)
        DEBUG=true
        shift # past argument
        ;;

        # --shell)
        # SHELL=true
        # shift # past argument
        # ;;

        *) # unknown option
        POSITIONAL+=("$1") # save it in an array for later
        shift # past argument
        ;;
    esac
done
set -- "${POSITIONAL[@]}" # restore positional parameters

# check if we have an .env file for docker-compose, if not create it from the template
if [[ ! -f "${SCRIPT_DIR}/.env" ]]; then
    cp ${SCRIPT_DIR}/.env.template ${SCRIPT_DIR}/.env
fi
# source the env file
set -o allexport
source ${SCRIPT_DIR}/.env
set +o allexport

# check if we want to start a precise module or not
if [[ -n "$1" ]] && [[ ! -d "${ROOT_DIR}/packages/$1" ]]; then
    echo "The module specified $1 doesn't exists"
    exit 1
else
    # we want to work on a specific module
    if [[ ! -z "$1" ]] ; then
        echo "Requesting specific module $1"
        MODULE_ID=$1
        if [[ ! -f "${ROOT_DIR}/packages/$1/.env" ]]; then
            cp ${ROOT_DIR}/packages/$1/.env.template ${ROOT_DIR}/packages/$1/.env
        fi
        # source the env file
        set -o allexport
        source ${ROOT_DIR}/packages/$1/.env
        set +o allexport

        # Check the docker container is not alreay up
        if [ -z "$(docker ps | grep -w \"${PROJECT_ID}-${MODULE_ID}\" | awk '{print $1}')" ]; then
            echo "  - project: ${PROJECT_ID}"
            echo "  - module: ${MODULE_ID}"
            echo "Creating container ${PROJECT_ID}-${MODULE_ID}"
            COMMANDS+=( "docker-compose \
                        -p ${PROJECT_ID}-${MODULE_ID} \
                        -f ${SCRIPT_DIR}/docker-compose.yml \
                        -f ${ROOT_DIR}/packages/$1/docker-compose.yml \
                        up -d ${BUILD}")
        fi
        CONTAINER_TARGET="${PROJECT_ID}-${MODULE_ID}"
        CONTAINER_WORKDIR="/home/${PROJECT_ID}/${APPLICATION_FOLDER}/packages/$1"
    # we want to work on the base image, no module selected
    else
        if  [ -z "$(docker ps | grep -w \"${PROJECT_ID}-development\" | awk '{print $1}')" ]; then
            COMMANDS+=( "docker-compose \
                        -p ${PROJECT_ID} \
                        -f ${SCRIPT_DIR}/docker-compose.yml \
                        up -d ${BUILD}" )
        fi
        CONTAINER_WORKDIR="/home/${PROJECT_ID}/${APPLICATION_FOLDER}"
        CONTAINER_TARGET="${PROJECT_ID}-development"
    fi
fi

if [[ -z ${SHELL_COMMAND} ]]; then
    COMMANDS+=( "docker exec -itw ${CONTAINER_WORKDIR} ${CONTAINER_TARGET} zsh" )
else
    COMMANDS+=( "docker exec -itw ${CONTAINER_WORKDIR} ${CONTAINER_TARGET} zsh -c \"${SHELL_COMMAND}\"" )
fi

# join the commands in a string and execute
COMMAND_STRING=$(printf " && %s" "${COMMANDS[@]}")
COMMAND_STRING=${COMMAND_STRING:3}
eval "${COMMAND_STRING}"