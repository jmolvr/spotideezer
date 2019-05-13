const axios = require('axios');

class DeezerAPI{
    constructor(){
        this.baseURL = "https://api.deezer.com"
        this.query = this.baseURL + "/search?q=";
        this.getTrack = this.baseURL + "/track/";
    }
    
    async getTrackLink(name, artist, album){
        try {
            const url = `${this.query}track:"${name}"artist:"${artist}"album:"${album}"`;
            const result = await axios.get(url);
            return result.data.data[0].link;
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