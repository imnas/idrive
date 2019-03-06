const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const db = require('mongoose');

// Init GridFS
let gfs;

// Grid Config
let connection = db.connection;

// Database connection
connection.once('open', () => {
    // Initialize stream
    gfs = Grid(connection.db, db.mongo);
    gfs.collection('uploads');
    console.log('File System Running!');
});

// Storage engine
const storage = new GridFsStorage({
    url: `${process.env.MONGO_URI}`,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                } else {
                    const filename = buf.toString('hex') + path.extname(file.originalname);
                    const fileInfo = {
                        filename,
                        bucketName: 'uploads'
                    };
                    resolve(fileInfo);
                }
            });
        });
    }
});

const upload = multer({ storage });

// @PATH    - POST /api/fs/upload
// @ACCESS  - Private
// @DESC    - Add a picture to the database
router.post('/upload', passport.authenticate('jwt', { session: false }), upload.single('file'), (req, res) => {
    if (req.file.contentType === 'image/jpeg' || req.file.contentType === 'image/png') {
        return res.status(200).json({ file: req.file.filename });
    } else {
        return res.status(400).json({ error: 'Invalid file type. Only JPEGs and PNGs are allowed.' });
    }
});

// @PATH    - GET /api/fs/:filename
// @ACCESS  - Public
// @DESC    - Get picture via name and send it's metadata
router.get('/get/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({ error: 'No file found.' });
        } else {
            return res.status(200).json(file);
        }
    })
});

// @PATH    - GET /api/fs/:filename
// @ACCESS  - Public
// @DESC    - Get picture via name and send it rendered
router.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({ error: 'No file found.' });
        } else {
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        }
    })
});

module.exports = router;