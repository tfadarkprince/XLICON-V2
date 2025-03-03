
FROM node:lts-buster

RUN git clone https://github.com/tfadarkprince/XLICON-V2 /root/XLICON-V2-MD
WORKDIR /root/XLICON-V2-MD/
RUN npm install -g npm@11.1.0
CMD ["pm2-runtime", "ecosystem.config.js"]
