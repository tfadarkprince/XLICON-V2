FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*
WORKDIR /app

COPY package.json .

ARG npm install && npm cache clean --force
RUN npm install -g pm2

COPY . .
ENV NODE_ENV production

EXPOSE 5000

CMD ["npm", "run", "start"]
