const spotifyWebAPI = require('spotify-web-api-node');
//client credentials

class SpotifyAPI{
    constructor(){
        this.spotifyapi = new spotifyWebAPI({
            clientId: process.env.spotifyClientID,
            clientSecret: process.env.spotifyClientSecret,
        });
        this.credentialsGrant();
    }

    credentialsGrant(){
        this.spotifyapi.clientCredentialsGrant().then((data) => {
            this.spotifyapi.setAccessToken(data.body['access_token']);
        }, (err) => {
            console.log("Something went wrong when retrieving an acess token", err.message);
        });
    }
    
    async getTrack(id){
        try{
            this.credentialsGrant();
            const data = await this.spotifyapi.getTrack(id);
            return {
                name: data.body.name,
                artist: data.body.artists[0].name,
                album: data.body.album.name,
            }
        }catch(err){
            console.log(err);
        }
    }

    async searchTrack(query){
        try{
            this.credentialsGrant(); 
            const data = await this.spotifyapi.searchTracks(query, {limit: 1, offset: 0});
            return {
                link: data.body.tracks.items[0].external_urls.spotify,
            }
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = new SpotifyAPI();