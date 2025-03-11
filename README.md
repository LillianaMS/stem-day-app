# STEM Day Application

A full-stack application for managing STEM Day events.

## Project Structure

- **client/** - React frontend built with Vite
- **server/** - Express.js backend

## Development Setup

### Prerequisites

- Node.js (v16 or later)
- MySQL

### Client Setup

```bash
cd client
npm install --verbose
npm run dev
```

The client will be available at http://localhost:3000.

### Server Setup

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
cd server
npm install
npm start
```

The server will be available at http://localhost:8081.

## Production Deployment

We use a two-stage deployment process:

1. Build locally and push to GitHub
2. Pull on the server and run the deployment script

### Local Build

Run the deployment script locally:

```bash
bash deploy.sh
```

This will:
- Build the client application
- Set up the server
- Create a remote deployment script

### Remote Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for the complete deployment instructions.

Environment variables are configured in `.env.production` on the server:

```
NODE_ENV=production
PORT=8081

# Database configuration
MYSQL_HOST=your_db_host
MYSQL_USER=your_db_user
MYSQL_PWD=your_db_password
MYSQL_DB=your_db_name
```

## Security Considerations

- Never commit `.env` files to version control
- Database credentials should be securely managed using environment variables
- Different environment configurations are used for development and production

## API Endpoints

- `GET /api/registeredSongs` - Get all registered songs