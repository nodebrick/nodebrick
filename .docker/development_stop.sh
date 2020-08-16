#!/bin/bash

# assign SCRIPT_DIR and ROOT_DIR
if [[ "$OSTYPE" == "darwin"* ]]; then
    # MacOS
    export SCRIPT_DIR=$(cd "$(dirname "$0")"; pwd)
else
    # Linux
    export SCRIPT_DIR=$(dirname $(readlink -f $0))
fi
export ROOT_DIR=$(realpath "${SCRIPT_DIR}/..")

# check if we have a .env file, if not create it from the template
if [[ ! -f "${SCRIPT_DIR}/.env" ]]; then
    cp ${SCRIPT_DIR}/.env.template ${SCRIPT_DIR}/.env
fi
# source the env file
set -o allexport
source ${SCRIPT_DIR}/.env
set +o allexport

# Down all the containers as none passed
if [[ -z "$1" ]]; then
    echo "Stopping all the containers"
    # find all the upped container
    containers=$(docker ps --format '{{.Names}}' | grep ${PROJECT_ID})
    if [[ -z ${containers} ]]; then
        echo "  - no containers to stop"
        echo "Done"
        exit;
    fi
    for container in $containers ; do
        ${SCRIPT_DIR}/development_stop.sh $container
    done
else
    # check if the environment is up
    if [[ ! -z "$(docker ps -q -f name=$1)" ]]; then
        # special case no modules
        if [[ "$1" == "${PROJECT_ID}-development" ]]; then
            echo "Stopping main container $1"
            COMMANDS+=( "docker-compose \
                        -p ${PROJECT_ID} \
                        -f ${SCRIPT_DIR}/docker-compose.yml \
                        down --remove-orphans" )
        else
            if [[ ! -f "${ROOT_DIR}/packages/$1/.env" ]]; then
                cp ${ROOT_DIR}/packages/$1/.env.template ${ROOT_DIR}/packages/$1/.env
            fi
            # source the env file
            set -o allexport
            source ${ROOT_DIR}/packages/$1/.env
            set +o allexport
            
            echo "Stopping module container ${PROJECT_ID}-${MODULE_ID}"
            COMMANDS+=( "docker-compose \
                        -p ${PROJECT_ID}-${MODULE_ID} \
                        -f ${SCRIPT_DIR}/docker-compose.yml \
                        -f ${ROOT_DIR}/packages/$1/docker-compose.yml \
                        down --remove-orphans" )
        fi
    fi
fi

# join the commands in a string and execute
COMMAND_STRING=$(printf " && %s" "${COMMANDS[@]}")
COMMAND_STRING=${COMMAND_STRING:3}
eval "${COMMAND_STRING}"