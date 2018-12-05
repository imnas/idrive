const express = require('express');
const app = express();
const config = require('./config/config');

app.listen(config.app.port, () => console.log(`Server's running on port ${config.app.port}!`));