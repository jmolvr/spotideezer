const axios = require('axios');

class DeezerAPI{
    constructor(){
        this.baseURL = "https://api.deezer.com"
        this.query = this.baseURL + "/search?q=";
        this.getTrack = this.baseURL + "/track/";
    }
    
    async getTrackLink(name, artist, album){
        try {
            const url = `${this.query}track:"${name}"artist:"${artist}"album:"${album}"`
            .normalize('NFD').replace(/[\u0300-\u036f]/g, ""); //retira os acentos
            const result = await axios.get(url);
            let {title_short, link} = result.data.data[0];
            let cover_album = result.data.data[0].album.cover_xl;
            let artist_name = result.data.data[0].artist.name;
            return {title: title_short, cover: cover_album, artist: artist_name, link: link};

        } catch (err) {
            console.log(err);
        }
    }

    async getTrackName(id){
        try {
            let url = this.getTrack + id;
            let result = await axios.get(url);
            return {
                name: result.data.title,
                artist: result.data.artist.name
            }
        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = new DeezerAPI();