FROM node:lts-buster

PKG Install installnpm install
COPY package.json .

RUN  npm install qrcode-terminal 
 

COPY . .

EXPOSE 5000

CMD ["node", "index.js", "--server"]
