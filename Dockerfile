FROM node:lts

RUN git clone https://github.com/tfadarkprince/XLICON-V2.git /root/XLICON-V2-MD/
WORKDIR /root/XLICON-V2-MD/
RUN npm install -g pm2
CMD ["npm", "start"]
