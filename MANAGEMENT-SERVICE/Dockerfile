FROM node:latest

COPY /package.json /nodeapp/package.json

WORKDIR /nodeapp

RUN npm install 
##&& mv /nodeapp/node_modules /nodeapp/node_modules

COPY / /nodeapp

EXPOSE 8000

CMD npm start