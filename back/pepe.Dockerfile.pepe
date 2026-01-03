# Use official Node.js LTS image as the base
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies separately to leverage Docker cache
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build TypeScript code
RUN npm run build

# Expose the port (default Express port, adjust if needed)
EXPOSE 3000

# Use non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Start the application
CMD ["node", "dist/index.js"]
