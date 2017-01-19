FROM node:6.9.1

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app
ARG APP_NAME=peds_api
ENV APP_NAME=$APP_NAME

COPY package.json npm-shrinkwrap.json $HOME/$APP_NAME/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/$APP_NAME
RUN npm install

USER root
COPY . $HOME/$APP_NAME
RUN chown -R app:app $HOME/*
USER app

CMD [ "./start_peds_api"]
