#!/bin/bash

# Remote deployment script for STEM day app
echo "Starting remote deployment for STEM Day App..."

# Define colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Source environment variables from .env.production if it exists
cd server
if [ -f ".env.production" ]; then
  echo "Loading environment variables from .env.production..."
  set -a  # automatically export all variables
  source .env.production
  set +a
fi

# Check environment variables
if [ -z "$MYSQL_HOST" ] || [ -z "$MYSQL_USER" ] || [ -z "$MYSQL_PWD" ] || [ -z "$MYSQL_DB" ]; then
  echo -e "${RED}Error: Required environment variables are not set.${NC}"
  echo "Make sure to set the following variables in .env.production or in your environment:"
  echo "  - MYSQL_HOST"
  echo "  - MYSQL_USER"
  echo "  - MYSQL_PWD"
  echo "  - MYSQL_DB"
  exit 1
fi

# Install PM2 globally if not already installed
if ! command -v pm2 &> /dev/null; then
  echo "Installing PM2 globally..."
  npm install -g pm2
fi

# Copy client build to server's public directory
echo "Copying client build to server public directory..."
mkdir -p /var/www/html/moodle/stemday
cp -r ../client/dist/* /var/www/html/moodle/stemday

# Start the server in production mode with PM2
echo "Starting server in production mode with PM2..."
export NODE_ENV=production
pm2 stop stem-day-app 2>/dev/null || true
pm2 start app.js --name "stem-day-app" || echo -e "${RED}Warning: Failed to start with PM2.${NC}"

# Set up PM2 to start on server boot
echo "Setting up PM2 to start on system boot..."
pm2 save
cd ..

echo -e "${GREEN}Remote deployment complete!${NC}"
echo "The application should now be running at http://remoodle.fun/stemday"
