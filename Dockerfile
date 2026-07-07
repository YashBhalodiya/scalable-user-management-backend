FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose port
EXPOSE 8000

# Start command
CMD ["sh", "-c", "node db/init.js && node server.js"]
