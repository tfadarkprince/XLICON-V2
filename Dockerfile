FROM node:lts-buster

ARG npm install
COPY package.json .

ARG  npm install qrcode-terminal 
 

COPY . .

EXPOSE 5000

CMD ["node", "index.js", "--server"]
