# STEM Day Application

A full-stack application for monitoring PR STEM Day creations.

## Project Structure

- **client/** - React frontend built with Vite
- **server/** - Express.js backend

## Development Setup

### Prerequisites

- Node.js (v16 or later)
- MySQL

### Client Setup for Development

```bash
cd client
npm install --verbose
npm run dev
```

The client will be available at http://localhost:3000.

### Server Setup for Development

1. Create a `.env` file in the server directory with your database credentials:

```
NODE_ENV=development
PORT=8081

# Database configuration
MYSQL_HOST="localhost"
MYSQL_USER="your-username"
MYSQL_PWD="your-password"
MYSQL_DB="stem_day_backend"
MYSQL_PORT=3306
```

2. Set up the database:

```bash
cd server
node dbSetup/initDB.js
```

3. Start the server:

```bash
npm install
npm start
```

The server will be available at http://localhost:8081.



## Production Deployment on Remote Server

To have better control of deployment:

1. First install all dependencies on the remote server
2. Build

### Install dependencies

#### Client

```bash
cd client
npm install --verbose
cd ..
```

#### Server

1. Configure environment variables in `.env.production` on the server:

```
NODE_ENV=production
PORT=8081

# Database configuration
MYSQL_HOST=your_db_host
MYSQL_USER=your_db_user
MYSQL_PWD=your_db_password
MYSQL_DB=your_db_name
```

2. Install dependencies and set up the database:

```bash
cd server
npm install --verbose
node dbSetup/initDB.js
cd ..
```

### Run deployment script

```
chmod +x deploy.sh
bash deploy.sh
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

## Security Considerations

- Never commit `.env` files to version control
- Database credentials should be securely managed using environment variables
- Different environment configurations are used for development and production

## API Endpoints

- `GET /api/registeredSongs` - Get all registered songs