const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('mongoose');
const authRoute = require('./routes/api/auth');
const profileRoute = require('./routes/api/profile');
const usersRoute = require('./routes/api/users');
const resultsRoute = require('./routes/api/results');
const passport = require('passport');
const cors = require('cors');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

// Config
require('dotenv').config()

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TEMP: Remove after testing
app.use(cors())

// Public/Static Folder
app.use(express.static('./public'));

// Method Override
app.use(methodOverride('_method'));

// Mongoose
const database = db.createConnection(process.env.MONGO_URI);

// Init GridFS
let gfs;

// Database connection
database.once('open', () => {
  // Initialize stream
  gfs = Grid(database.db, db.mongo);
  gfs.collection('uploads');
  console.log('Mongoose Connection Established!');
});

// Storage engine
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
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

// Passport
app.use(passport.initialize());
require('./config/passport')(passport);

// Image uploading route
app.post('/fs/upload', upload.single('file'), (req, res) => {
  if (req.file.contentType === 'image/jpeg' || req.file.contentType === 'image/png') {
    return res.status(200).json({ file: req.file.filename });
  } else {
    return res.status(400).json({ error: 'Invalid file type. Only JPEGs and PNGs are allowed.' });
  }
});

// Image retrieving route
app.get('/fs/get/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({ error: 'No file found.' });
    } else {
      return res.status(200).json(file);
    }
  })
});

// Image rendering route
app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({ error: 'No file found.' });
    } else {
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    }
  })
});

// Routes
app.use('/api/auth', authRoute);
app.use('/api/profile', profileRoute);
app.use('/api/users', usersRoute);
app.use('/api/results', resultsRoute);

// Server
app.listen(process.env.PORT, () => console.log(`Server's running on port ${process.env.PORT}!`));