// Description: This file contains the queries used in the NSF Stem Day website

// CREATE
const registry = `INSERT INTO registry (qrCodeNum, firstName, lastName, email, scriptName, mp3Url) VALUES (?, ?, ?, ?, ?, ?)`; // startDate is set to current date in the DB by default

// READ
const registeredSongs = `SELECT qrCodeNum, firstName, lastName, email, startDate, scriptName, mp3Url, shareID, shareUrl
                        FROM registry
                        ORDER BY startDate`;


// UPDATE
// shareID y shareUrl van a tener que ser un UPDATE al DB porque no share ID no va a estar disponible hasta que se cree la canción
const sharing = `UPDATE registry 
                SET shareID = ?, shareUrl = ? 
                WHERE qrCodeNum = ?`;

// DELETE
const registreeOut = `DELETE FROM registry 
                    WHERE qrCodeNum = ?`;


module.exports = {
    registry,
    registeredSongs,
    sharing,
    registreeOut
};