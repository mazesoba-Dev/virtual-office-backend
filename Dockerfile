FROM node:19
WORKDIR /usr/app
COPY ./package.json /usr/app
RUN npm install /usr/app
