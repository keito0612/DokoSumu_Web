FROM node:23-alpine

WORKDIR /app

# nextアプリが用意できた後、戻す
# package.jsonとpackage-lock.jsonをコピー
COPY ./next/package*.json ./

RUN npm install

