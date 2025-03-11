#!/bin/bash

# Full deployment script for STEM day app
echo "Starting deployment for STEM Day Full Stack App..."

# Define colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Deploy client
echo -e "${BLUE}Deploying client...${NC}"
cd client

# Install production dependencies
echo "Installing client dependencies..."
npm install --only=production --no-audit --no-fund

# Build client
echo "Building optimized production bundle..."
npm run build

cd ..

# Deploy server
echo -e "${BLUE}Deploying server...${NC}"
cd server

# Install production dependencies
echo "Installing server dependencies..."
npm ci --only=production --no-audit --no-fund

# Check if environment variables are set for production
if [ -z "$DB_HOST" ] || [ -z "$DB_USER" ] || [ -z "$DB_PASSWORD" ] || [ -z "$DB_NAME" ] || [ -z "$DB_PORT" ]; then
  echo -e "\033[0;31mError: Required environment variables are not set.${NC}"
  echo "Make sure to set the following variables:"
  echo "  - DB_HOST"
  echo "  - DB_USER"
  echo "  - DB_PASSWORD"
  echo "  - DB_NAME"
  echo "  - DB_PORT"
  exit 1
fi

# Start the server in production mode
echo "Starting server in production mode..."
export NODE_ENV=production
npx pm2 start server.js --name "stem-day-app" || echo -e "\033[0;31mWarning: Failed to start with PM2. Is PM2 installed?${NC}"

cd ..

echo -e "${GREEN}Deployment complete!${NC}"
echo "The application should now be running in production mode."