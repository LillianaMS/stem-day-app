# STEM Day Application

A full-stack application for managing STEM Day events.

## Project Structure

- **client/** - React frontend built with Vite
- **server/** - Express.js backend

## Development Setup

### Prerequisites

- Node.js (v14 or later)
- MySQL

### Client Setup

```bash
cd client
npm install
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

### Environment Variables

Before deployment, ensure the following environment variables are set on your production server:

- `NODE_ENV=production`
- `DB_HOST` - Production database host
- `DB_USER` - Production database user
- `DB_PASSWORD` - Production database password
- `DB_NAME` - Production database name
- `DB_PORT` - Production database port

### Deployment Script

Run the deployment script from the project root:

```bash
chmod +x deploy.sh
./deploy.sh
```

## Security Considerations

- Never commit `.env` files to version control
- Database credentials should be securely managed using environment variables
- Different environment configurations are used for development and production

## API Endpoints

- `GET /api/registeredSongs` - Get all registered songs