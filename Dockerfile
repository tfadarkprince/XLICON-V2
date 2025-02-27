FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

COPY package*.json ./

ARG npm install && npm cache clean --force
RUN npm install -g pm2

COPY . .

ENV NODE_ENV production

CMD ["npm", "run", "start"]
