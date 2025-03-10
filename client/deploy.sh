#!/bin/bash

# Optimized deployment script for STEM day app
echo "Starting optimized deployment for STEM day app..."

# Install only production dependencies
echo "Installing only required dependencies..."
npm ci --only=production --no-audit --no-fund

# Build with optimizations
echo "Building optimized production bundle..."
npm run build

echo "Build complete! Deploy the 'build' directory to your server."