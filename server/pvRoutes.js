const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const server = require('./server');
const pvQueries = require('./pvQueries');

router.use(bodyParser.json());

// Generic query handler function
const handleQuery = (query, params) => async (req, res) => {
    try {
        const results = await server.query(query, params(req));
        res.status(200).json(results);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Create record routes
router.post('/registry', handleQuery(pvQueries.registry, req => [
    req.body.qrCodeNum,
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.scriptName,
    req.body.mp3Url
]));

// Read record routes
router.get('/registeredSongs', handleQuery(pvQueries.registeredSongs, req => []));

// Update record routes
router.patch('/sharing', handleQuery(pvQueries.sharing, req => [
    req.body.shareID,
    req.body.shareUrl,
    req.body.qrCodeNum
]));

// Delete record routes
router.delete('/registreeOut/:qrCodeNum', handleQuery(pvQueries.registreeOut, req => [req.params.qrCodeNum]));


module.exports = router;