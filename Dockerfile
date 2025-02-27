FROM node:lts-buster

# Install dependencies
RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg imagemagick webp && apt-get clean

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm cache clean --force&npm cache verify & npm start -- --reset-cache & npm install -g pm2

# Copy application code
COPY . .

# Set environment
ENV NODE_ENV production

# Run command
CMD ["npm", "run", "start"]

