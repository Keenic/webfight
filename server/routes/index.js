const config = require('../config/config');
const express = require('express');
const router = express.Router();

module.exports = {
    game: (req, res) => res.sendFile(`${config.appPath}/dist/index.html`),
}
