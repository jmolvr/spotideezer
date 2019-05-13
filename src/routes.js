const express = require('express');
const routes = express.Router();
const ConvertController = require('./controllers/ConvertController');


routes.post("/getURLDeezer", ConvertController.spotifyToDeezer);
routes.post("/getURLSpotify", ConvertController.deezerToSpotify);

module.exports = routes;

