
FROM node:lts-buster

RUN git clone https://github.com/tfadarkprince/XLICON-V2 /root/XLICON-V2-MD
WORKDIR /root/XLICON-V2-MD/
RUN npm install
CMD ["pm2-runtime", "ecosystem.config.js"]
