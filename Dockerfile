FROM node:lts-buster

COPY npm install
COPY package.json .

RUN  npm install qrcode-terminal 
 

COPY . .

EXPOSE 5000

CMD ["node", "index.js", "--server"]
