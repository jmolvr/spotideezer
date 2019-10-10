const spotifyAPI = require('../config/spotify');
const Deezer = require('../config/deezer');

class ConvertController{
    static getID(url){
        let aux = url.split('/');
        return aux[aux.length - 1];
    }

    async spotifyToDeezer(req, res){
        let url = req.body.url;
        let id = ConvertController.getID(url);
        const {name, artist, album} = await spotifyAPI.getTrack(id);
        let result = await Deezer.getTrackLink(name, artist, album);
        res.json(result);
    }

    async deezerToSpotify(req, res){
        let url = req.body.url;
        let id = ConvertController.getID(url);
        let {name, artist} = await Deezer.getTrackName(id); // armazena nome da música
        let query = `track:${name} artist:${artist}`;
        const result = await spotifyAPI.searchTrack(query);
        res.json(result);
    }
}
module.exports = new ConvertController();