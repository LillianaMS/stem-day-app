-- CREATE DATABASE IF NOT EXISTS remezcla;

USE remezcla;

CREATE TABLE IF NOT EXISTS registry (
    qrCodeNum VARCHAR(128) NOT NULL PRIMARY KEY,
    firstName VARCHAR(128),
    lastName VARCHAR(128),
    email VARCHAR(128),
    startDate DATETIME DEFAULT NOW(),
    shareID VARCHAR(128),
    shareUrl VARCHAR(128),
    scriptName VARCHAR(128),
    mp3Url VARCHAR(128)
);