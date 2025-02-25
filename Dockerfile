FROM node:lts-buster

RUN git clone https://github.com/tfadarkprince/XLICON-V2 /root/XLICON-V2

WORKDIR /root/XLICON-V2/

RUN npm install --platform=linuxmusl
EXPOSE 5000
CMD ["npm", "start"]
