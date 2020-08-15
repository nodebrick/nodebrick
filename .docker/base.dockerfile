ARG NODE_VERSION=13
ARG DEBIAN_VERSION=buster
ARG PROJECT_ID=default
ARG APPLICATION_FOLDER="application"

########################################################
# BASE IMAGE
########################################################
FROM node:${NODE_VERSION}-${DEBIAN_VERSION} as base

ARG PROJECT_ID
ARG NODE_VERSION
ARG DEBIAN_VERSION
ARG APPLICATION_FOLDER

ENV PROJECT_ID=${PROJECT_ID}
ENV APPLICATION_FOLDER="${APPLICATION_FOLDER}"
ENV NODE_VERSION="${NODE_VERSION}"
ENV DEBIAN_VERSION="${DEBIAN_VERSION}"
ENV DEBIAN_FRONTEND noninteractive 

# Update all packages
RUN apt-get clean \
    && apt-get -y -q update \
    && apt-get -y -q install \
            curl \
            procps \
            vim \
            git \
            screen

# Create user for our app
RUN echo "${PROJECT_ID}"
RUN useradd --user-group --create-home --shell /bin/false ${PROJECT_ID}

# set our home
ENV HOME=/home/${PROJECT_ID}

# switch to this user
USER ${PROJECT_ID}

## Update the location of global packages to not be on root but user home
RUN mkdir "${HOME}/.node"

# Tell npm where to store the globally installed packages
RUN echo 'prefix=~/.node' >> "${HOME}/.npmrc"

# Add the new bin and node_modules folders to your $PATH and $NODE_PATH variables
RUN echo 'PATH="$HOME/.node/bin:$PATH"' >> "${HOME}/.profile" \
    && echo 'NODE_PATH="$HOME/.node/lib/node_modules:$NODE_PATH"' >> "${HOME}/.profile" \
    && echo 'MANPATH="$HOME/.node/share/man:$MANPATH"' >> "${HOME}/.profile" \
    && . "${HOME}/.profile"

# install the latest yarn version
RUN curl --compressed -o- -L https://yarnpkg.com/install.sh | bash

WORKDIR "${HOME}/${APPLICATION_FOLDER}"

########################################################
# TESTING IMAGE
########################################################
FROM base AS testing

ARG PROJECT_ID
ARG APPLICATION_FOLDER

USER root

# add open ssh
RUN apt-get clean \
    && apt-get -y -q update \
    && apt-get -y -q install \
        chromium chromium-driver \
        zsh

# set chrome bin and path used for testing
ENV CHROME_BIN=/usr/bin/chromium-browser \
    CHROME_PATH=/usr/lib/chromium/

# be sure all files in the user root folder are accessible by the user
USER root
RUN chown -R ${PROJECT_ID}:${PROJECT_ID} "${HOME}" && chmod -R 755 "${HOME}"

USER ${PROJECT_ID}
WORKDIR "${HOME}/${APPLICATION_FOLDER}"

########################################################
# DEVELOPMENT
########################################################
FROM testing AS development

ARG PROJECT_ID
ARG MODULE_ID
ARG APPLICATION_FOLDER

USER root

# add git and open ssh
RUN apt-get clean \
    && apt-get -y -q update \
    && apt-get -y -q install \
        jq \
        python \
        zip

# switch to non root user
USER ${PROJECT_ID}

# change the history location so we can mount it
RUN mkdir -p ${HOME}/docker
ENV HISTFILE=${HOME}/docker/.bash_history
RUN chown -R ${PROJECT_ID}:${PROJECT_ID} ${HOME}/docker

# commitizen (formated commit so we can create nice release following semantic versioning)
RUN yarn global add commitizen cz-conventional-changelog yarn-run \
    && echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc

# add profile to bash in case dev uses bash
RUN echo "PS1='${PROJECT_ID}:\w$ '" >> ~/.profile \
    && echo ". ~/.profile" > ~/.bashrc

# add zgen
RUN git clone https://github.com/tarjoilija/zgen.git "${HOME}/.zgen"

# create zshrc
RUN printf "\n\
    export TERM=\"xterm-256color\" \n\
    export LANG=\"en_US.UTF-8\" \n\
    export LC_COLLATE=\"en_US.UTF-8\" \n\
    export LC_CTYPE=\"en_US.UTF-8\" \n\
    export LC_MESSAGES=\"en_US.UTF-8\" \n\
    export LC_MONETARY=\"en_US.UTF-8\" \n\
    export LC_NUMERIC=\"en_US.UTF-8\" \n\
    export LC_TIME=\"en_US.UTF-8\" \n\
    export LC_ALL=\"en_US.UTF-8\" \n\
    export PATH=~/.local/bin:\${PATH} \n\
    export PATH=/usr/local/sbin:\${PATH} \n\
    export PATH=~/application/node_modules/.bin:\${PATH} \n\
    fpath=(~/.zsh_completion \"\${fpath[@]}\") \n\
\n\
    # PowerLevel Config \n\
    #POWERLEVEL9K_MODE='awesome-patched' \n\
    POWERLEVEL9K_MODE='flat' \n\
    POWERLEVEL9K_SHORTEN_DIR_LENGTH=2 \n\
    POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(os_icon dir vcs) \n\
    POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(status) \n\
\n\
    POWERLEVEL9K_OS_ICON_BACKGROUND=\"white\" \n\
    POWERLEVEL9K_OS_ICON_FOREGROUND=\"blue\" \n\
    POWERLEVEL9K_DIR_HOME_FOREGROUND=\"white\" \n\
    POWERLEVEL9K_DIR_HOME_SUBFOLDER_FOREGROUND=\"white\" \n\
    POWERLEVEL9K_DIR_DEFAULT_FOREGROUND=\"white\" \n\
\n\
# Source Profile \n\
[[ -e ~/.profile ]] && emulate sh -c 'source ~/.profile' \n\
\n\
# Load compinit for autocompletion \n\
# autoload -Uz compinit && compinit -i \n\
\n\
# finally load zgen \n\
source \"\${HOME}/.zgen/zgen.zsh\" \n\
\n\
# if the init scipt doesn't exist \n\
if ! zgen saved; then \n\
    echo \"Creating a zgen save\" \n\
    # Load the oh-my-zsh's library. \n\
    zgen oh-my-zsh \n\
\n\
    # plugins \n\
    zgen oh-my-zsh plugins/git \n\
    zgen oh-my-zsh plugins/sudo \n\
    zgen oh-my-zsh plugins/command-not-found \n\
    zgen load zsh-users/zsh-syntax-highlighting \n\
    zgen load lukechilds/zsh-nvm \n\
\n\
    # completions \n\
    zgen load zsh-users/zsh-completions src \n\
\n\
    # theme \n\
    # zgen load bhilburn/powerlevel9k powerlevel9k \n\
\n\
    # save all to init script \n\
    zgen save \n\
fi \n\
setopt PROMPT_SUBST \n\
PROMPT='%%~ $ ' \n " > ~/.zshrc

# setting zsh as default screen
RUN printf "\
    shell \"/usr/bin/zsh\" \n\
    " > ~/.screenrc

RUN git config --global credential.helper store && \
    git config --global http.sslVerify false && \
    git config --global user.email "${VCS_EMAIL}" && \
    git config --global user.name "${VCS_FULLNAME}"

# make sure all files in the user root folder are accessible by the user
USER root
RUN chown -R ${PROJECT_ID}:${PROJECT_ID} "${HOME}" && chmod -R 755 "${HOME}"
USER ${PROJECT_ID}

# set the working directory
WORKDIR "${HOME}/${APPLICATION_FOLDER}"

# get the first zsh run
RUN zsh -c "source ~/.zshrc"