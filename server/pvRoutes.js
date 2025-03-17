const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const server = require('./server');
const pvQueries = require('./pvQueries');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer storage for MP3 uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const dir = path.join(__dirname, 'songs');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function(req, file, cb) {
        // Use the original filename from the client
        cb(null, file.originalname);
    }
});

// Set up multer upload with file filter for MP3s
const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        // Accept all audio types and files with .mp3 extension
        if (file.mimetype.startsWith('audio/') || 
            file.originalname.toLowerCase().endsWith('.mp3')) {
            cb(null, true);
        } else {
            return cb(new Error('Only audio files are allowed'), false);
        }
    },
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB maximum file size
    }
});

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

// Check if file exists endpoint
router.post('/check-file-exists', (req, res) => {
    try {
        const fileName = req.body.fileName;
        if (!fileName) {
            return res.status(400).json({ success: false, message: 'Filename is required' });
        }
        
        const filePath = path.join(__dirname, 'songs', fileName);
        const exists = fs.existsSync(filePath);
        
        return res.status(200).json({
            success: true,
            exists: exists
        });
    } catch (error) {
        console.error('Error checking file existence:', error);
        return res.status(500).json({
            success: false,
            message: `Error checking file: ${error.message}`
        });
    }
});

// MP3 file upload endpoint
router.post('/upload-song', upload.single('mp3File'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        
        console.log('File uploaded successfully:', req.file);
        
        // Create mp3Url to be stored in database
        const mp3Url = `/api/songs/${req.file.filename}`;
        
        return res.status(200).json({
            success: true,
            message: 'File uploaded successfully',
            fileName: req.file.filename,
            mp3Url: mp3Url
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({
            success: false,
            message: `Error uploading file: ${error.message}`
        });
    }
});

// Serve static files from the songs directory
router.use('/songs', express.static(path.join(__dirname, 'songs')));

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