# Backend Server for NSF STEM Day Event

Express.js server for the STEM Day application.

## Development Setup

1. Create a `.env` file in the server directory with your MySQL credentials:

```
NODE_ENV=development
PORT=8081
MYSQL_HOST=<yourHost>
MYSQL_USER=<yourUsername>
MYSQL_PWD=<yourPassword>
MYSQL_DB='stem-day-backend'
```

2. Initialize the database:
```
npm run init-db
```

3. Start the development server:
```
npm start
```

## Production Setup

1. Create a `.env.production` file based on the example template:
```
cp .env.production.example .env.production
```

2. Edit the production environment variables:
```
nano .env.production
```

3. For deployment instructions, see the main [DEPLOYMENT.md](../DEPLOYMENT.md) file in the project root.

## API Endpoints

- `GET /api/registeredSongs` - Get all registered songs