FROM node:18-alpine

COPY . ./app

RUN npm install