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
            $.each(res.streams, function(i, stream) {
                showChannel(stream);
            });
        },
        error: function(err) {
            alert(err);
        }
    });
}

function showChannel(stream) {

    // 抓取資料
    const preImg = stream.preview.medium;
    const avatarImg = stream.channel.logo;
    const title = stream.channel.status;
    const name = stream.channel.display_name;
    const viewers = stream.viewers;
    console.log(title, name)
        // 插入 DOM 中
    const channel = $('<div class="channel"><div>');
    channel.html(`
        <div class="wrap">
            <div class="preview">
                <img src=${preImg} alt="preview">
            </div>
            <div class="viewer">觀眾人數 : ${viewers}</div>
            <div class="info">
                <div class="avatar">
                    <img src=${avatarImg} alt="streamer">
                </div>
                <div class="intro">
                    <h4 class="channel-name">${title.substr(0,25)} ...</h4>
                    <span class="streamer">${name}</span>
                </div>
            </div>
        </div>
    `);

    $('#channels').append(channel);
}

getLiveStreams();