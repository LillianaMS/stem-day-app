# Backend Server for NSF STEM Day Event

Express.js server for the STEM Day application.

## Setup

1. Create a `.env` file in the server directory with your MySQL credentials:

```
NODE_ENV=development
PORT=8081
MYSQL_HOST=<yourHost>
MYSQL_USER=<yourUsername>
MYSQL_PWD=<yourPassword>
MYSQL_DB=<yourDBName>
```

2. Initialize the database:
```
npm run init-db
```

3. Start the development server:
```
npm start
```

## API Endpoints

- `GET /api/registeredSongs` - Get all registered songs