FROM node:lts-buster

# Install dependencies
RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg imagemagick webp && apt-get clean

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
