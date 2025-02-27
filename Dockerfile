FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

COPY package.json .

ARG npm install && npm install qrcode-terminal

COPY index.js

EXPOSE 5000

CMD ["npm", "start"]
