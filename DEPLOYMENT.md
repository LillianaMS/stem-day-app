# Deployment Guide for STEM Day App

This guide explains how to deploy the STEM Day App to your remote server using a two-step process:
1. Local build and GitHub push
2. Remote server deployment

## Prerequisites

- Access to your remote server with SSH key
- GitHub account with push access to this repository
- Node.js and npm installed locally
- MySQL database on the remote server

## Deployment Process

### 1. Local Build

Run the deployment script locally to build the application and create the remote deployment script:

```bash
bash deploy.sh
```

This will:
- Install dependencies for both client and server
- Build the client application for production
- Create a `remote-deploy.sh` script for server deployment

### 2. Git Commit and Push

Commit the changes to GitHub (including build files):

```bash
git add .
git commit -m "Build for deployment"
git push origin main
```

### 3. Server Deployment

SSH into your remote server:

```bash
ssh your-username@remoodle.fun
```

Navigate to your application directory and pull the latest changes:

```bash
cd /path/to/your/repo
git pull
```

Set up your production environment variables:

```bash
cd server
cp .env.production.example .env.production
vim .env.production  # Edit with your actual database credentials
```

Run the remote deployment script:

```bash
cd ..
bash remote-deploy.sh
```

## Application Access

After successful deployment, your application will be accessible at:
http://remoodle.fun/stemday

## Troubleshooting

### Database Connection Issues

If you encounter database connection issues:
1. Verify that the MySQL credentials in `.env.production` are correct
2. Ensure the MySQL server is running
3. Check firewall rules for MySQL port access

### PM2 Process Management

To manage the running process:

```bash
# View running processes
pm2 list

# Check logs
pm2 logs stem-day-app

# Restart the application
pm2 restart stem-day-app
```

### Server Persistence

To ensure PM2 restarts on server reboot:

```bash
pm2 startup
pm2 save
```