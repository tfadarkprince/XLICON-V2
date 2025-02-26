FROM node:lts-buster

RUN git clone https://github.com/tfadarkprince/XLICON-V2 /root/XLICON-V2-MD
WORKDIR /root/XLICON-V2-MD/
RUN yarn install
EXPOSE 5000
CMD ["npm", "start"]
