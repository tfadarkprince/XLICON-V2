FROM node:lts-buster

# Install dependencies
RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg imagemagick webp && apt-get clean

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install -g pm2

# Copy application code
COPY . .


# Run command
CMD ["npm", "run", "start"]
