const limet = 9;
const clientId = 'bgo21lskupamuirpz6ra5cn1ri0mta';

function getLiveStreams() {
    $.ajax({
        url: `https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends&limit=${limet}`,
        headers: {
            'Client-ID': clientId,
            'Accept': 'application/vnd.twitchtv.v5+json'
        },
        method: 'GET',
        dataType: 'json',
        success: function(res) {
            console.log(res)
        }
    });
}

getLiveStreams();