FROM node:lts-buster

RUN npm install && npm install qrcode-terminal
COPY package.json .

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
