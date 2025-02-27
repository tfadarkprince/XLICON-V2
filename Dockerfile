FROM node:lts-buster

RUN npm install
COPY package.json .

RUN  npm install qrcode-terminal 

RUN npm install 

COPY . .

EXPOSE 5000

CMD ["node", "index.js", "--server"]
