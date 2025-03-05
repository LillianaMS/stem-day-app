/* Script for the initial setup of the database */

const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const { connect } = require('http2');
require('dotenv').config();


// Create a DB connection
const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    multipleStatements: true, // So that we can run multiple queries in one query
    //no need to specify database here because we will create a new one with the initDB.sql script
});

// Paths to the SQL scripts
const initDBPath = path.join(__dirname, 'initDB.sql');
const seedDBPath = path.join(__dirname, 'seed.sql');

// Desde este momento <================================
// Read the SQL files
const initDBSql = fs.readFileSync(initDBPath, 'utf-8');
const seedDBSql = fs.readFileSync(seedDBPath, 'utf-8');


db.getConnection((err, connection) => {
    if (err) throw err;
  
    // Execute the initDB.sql script
    connection.query(initDBSql, (err, results) => {
      if (err) {
        connection.release();
        throw err;
      }
      console.log('Database setup complete:\n', results);
  
      // Execute the seed.sql script
      connection.query(seedDBSql, (err, results) => {
        connection.release();
  
        if (err) throw err;
        console.log('Database seeding complete:\n', results);
  
        // Close the pool after the queries are executed
        db.end((err) => {
          if (err) throw err;
          console.log('Database connection closed');
        });
      });
    });
  });