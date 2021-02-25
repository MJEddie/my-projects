let nowIndex = 0;
let isLoading = false;
let gameName = 'League%20of%20Legends';
const clientId = 'bgo21lskupamuirpz6ra5cn1ri0mta';

function getLiveStreams() {
    const limit = 9;
    isLoading = true;
    $.ajax({
        url: `https://api.twitch.tv/kraken/streams/?game=${gameName}&limit=${limit}&offset=${nowIndex}`,
        headers: {
            'Client-ID': clientId,
            'Accept': 'application/vnd.twitchtv.v5+json'
        },
        method: 'GET',
        dataType: 'json',
        success: function(res) {
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
    const url = stream.channel.url;
    const viewers = stream.viewers;

    // 插入 DOM 中
    const channel = $('<div class="channel"><div>');
    channel.html(`
        <div class="wrap" onclick="window.open('${url}','_blank')">
            <div class="preview">
                <img src=${preImg} alt="preview">
            </div>
            <div class="viewer">觀眾人數 : ${viewers}</div>
            <div class="info">
                <div class="avatar">
                    <img src=${avatarImg} alt="streamer">
                </div>
                <div class="intro">
                    <h4 class="channel-name">${title} ...</h4>
                    <span class="streamer">${name}</span>
                </div>
            </div>
        </div>
    `);

    $('#channels').append(channel);
    nowIndex += 9;
    isLoading = false;
}

// show live streams
getLiveStreams();

// infinite scroll
$(window).scroll(function() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 200) {
        if (!isLoading) {
            getLiveStreams();
        }
    }
});

// event listener
$('button').click(function() {
    gameName = $(this).attr('name');
    $(this).addClass('active').siblings().removeClass('active');
    $('#channels').html('');

    // reset
    nowIndex = 0;
    getLiveStreams();
});