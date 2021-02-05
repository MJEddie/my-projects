let q = $('#search-field').val();

$('#search-btn').click(function(e) {
    e.preventDefault();

    getVideos(q);
});

// Search youtube data
function getVideos() {
    $.ajax({
        url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=relevance&q=${q}&key=AIzaSyBs4RcftfDFAtDE9ndaHFaZAtCYKVMCIfI`,
        method: 'GET',
        data: 'data',
        dataType: 'json',
        success: function(res) {

            const nextPageToken = res.nextPageToken;
            const prevPageToken = res.prevPageToken;

            $.each(res.items, function(i, item) {
                showViedos(item);
            });

            generateButtons(prevPageToken, nextPageToken);
        }
    });
}

// 顯示搜尋結果
function showViedos(item) {

    // 抓取資料
    const videoID = item.id.videoId;
    const title = item.snippet.title;
    const description = item.snippet.description;
    const thumbnail = item.snippet.thumbnails.high.url;
    const channelTitle = item.snippet.channelTitle;
    const videoDate = item.snippet.publishedAt;

    // 清空內容
    $('#results').html('');
    $('#buttons').html('');

    // 插入 DOM 中
    const result = $('<li></li>');
    result.html(`
        <div class="thumbnail">
            <img src="${thumbnail}" alt="">
        </div>
        <div class="info">
            <h3><a data-fancybox href="http://www.youtube.com/embed/${videoID}">${title}</a></h3>
            <small>By <span class="cTitle">${channelTitle}</span> on ${videoDate.substr(0,10)}</small>
            <p>${description}</p>
        </div>
        `);

    $('#results').append(result);
}

// 搜尋結果上一頁
function prevPage() {
    const token = $('#prev-button').data('token');

    // 清空內容
    $('#results').html('');
    $('#buttons').html('');

    $.ajax({
        url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=relevance&q=${q}&pageToken=${token}&key=AIzaSyBs4RcftfDFAtDE9ndaHFaZAtCYKVMCIfI`,
        method: 'GET',
        data: 'data',
        dataType: 'json',
        success: function(res) {

            const nextPageToken = res.nextPageToken;
            const prevPageToken = res.prevPageToken;

            $.each(res.items, function(i, item) {
                showViedos(item);
            });

            generateButtons(prevPageToken, nextPageToken);
        }
    });
}

// 搜尋結果下一頁
function nextPage() {
    const token = $('#next-button').data('token');

    // 清空內容
    $('#results').html('');
    $('#buttons').html('');

    $.ajax({
        url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=relevance&q=${q}&pageToken=${token}&key=AIzaSyBs4RcftfDFAtDE9ndaHFaZAtCYKVMCIfI`,
        method: 'GET',
        data: 'data',
        dataType: 'json',
        success: function(res) {

            const nextPageToken = res.nextPageToken;
            const prevPageToken = res.prevPageToken;

            $.each(res.items, function(i, item) {
                showViedos(item);
            });

            generateButtons(prevPageToken, nextPageToken);
        }
    });
}

function generateButtons(prevPageToken, nextPageToken) {
    if (!prevPageToken) {
        const button = $(`
        <div class="button-container">
            <button id="next-button" class="next-button" data-token="${nextPageToken}" data-query="${q}" onclick="nextPage()"></button>
        </div>
        `);
        $('#buttons').append(button);
    } else {
        const button = $(`
        <div class="button-container">
            <button id="prev-button" class="prev-button" data-token="${prevPageToken}" data-query="${q}" onclick="prevPage()"></button>
            <button id="next-button" class="next-button" data-token="${nextPageToken}" data-query="${q}" onclick="nextPage()"></button>
        </div>
        `);
        $('#buttons').append(button);
    }
}