#!/bin/bash

# assign SCRIPT_DIR and ROOT_DIR
if [[ "$OSTYPE" == "darwin"* ]]; then
    # MacOS
    echo "MacOS detected"
    SCRIPT_DIR=$(cd "$(dirname "$0")"; pwd)
else
    # Linux
    echo "Linux OS detected"
    SCRIPT_DIR=$(dirname $(readlink -f $0))
fi
ROOT_DIR=$(realpath "${SCRIPT_DIR}/..")

# get our arguments
POSITIONAL=()
COMMANDS=()
MODULE_ID=""
BUILD=""

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

        --shell)
        SHELL=true
        shift # past argument
        ;;

        *) # unknown option
        POSITIONAL+=("$1") # save it in an array for later
        shift # past argument
        ;;
    esac
done
set -- "${POSITIONAL[@]}" # restore positional parameters

# check if we have a .env file, if not create it from the template
if [[ ! -f "${SCRIPT_DIR}/.env" ]]; then
    cp ${SCRIPT_DIR}/.env.template ${SCRIPT_DIR}/.env
fi
# source the env file
set -o allexport
source ${SCRIPT_DIR}/.env
set +o allexport

# check if we want to start a precise module or not
if [[ ! -z "$1" ]] || [[ ! -d "${ROOT_DIR}/packages/$1" ]]; then
    echo "The module specified $1 doesn't exists"
    exit 1
else
    # we want to work on a specific module
    if [[ ! -z "$1" ]] ; then
        "Requesting specific module $1"
        MODULE_ID=$1
        if [[ ! -f "${ROOT_DIR}/packages/$1/.env" ]]; then
            cp ${ROOT_DIR}/packages/$1/.env.template ${ROOT_DIR}/packages/$1/.env
        fi
        # source the env file
        set -o allexport
        source ${ROOT_DIR}/packages/$1/.env
        set +o allexport

        # Check the docker container is not alreay up
        if [ -z "$(docker ps | grep -w \"${MODULE_ID}\" | awk '{print $1}')" ]; then
            COMMANDS+=( "docker-compose -p ${MODULE_ID} -f ${SCRIPT_DIR}/docker-compose.yml -f ${ROOT_DIR}/packages/$1/docker-compose.yml up -d ${BUILD}")
        fi

    # we want to work on the base image, no module selected
    elif  [ -z "$(docker ps | grep -w \"${PROJECT_ID}\" | awk '{print $1}')" ]; then
            COMMANDS+=( "ROOT_DIR=${ROOT_DIR} docker-compose -f \"${SCRIPT_DIR}/docker-compose.yml\" -p ${PROJECT_ID} up -d ${BUILD}" )
            COMMANDS+=( "docker exec -it ${PROJECT_ID}-development zsh" )
    fi
fi

# join the commands in a string and execute
COMMAND_STRING=$(printf " && %s" "${COMMANDS[@]}")
COMMAND_STRING=${COMMAND_STRING:3}
eval "${COMMAND_STRING}"