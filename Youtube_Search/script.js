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
            console.log(res);

            $.each(res.items, function(i, item) {
                showViedos(item);
            })
        }
    });
}

function showViedos(item) {

    const videoID = item.id.videoId;
    const title = item.snippet.title;
    const description = item.snippet.description;
    const thumbnail = item.snippet.thumbnails.high.url;
    const channelTitle = item.snippet.channelTitle;
    const videoDate = item.snippet.publishedAt;

    const result = $('<li></li>');
    result.html(`
        <div class="thumbnail">
            <img src="${thumbnail}" alt="">
        </div>
        <div class="info">
            <h3><a href="http://www.youtube.com/embed/${videoID}">${title}</a></h3>
            <small>By <span class="cTitle">${channelTitle}</span> on ${videoDate.substr(0,10)}</small>
            <p>${description}</p>
        </div>
        `);

    $('#results').append(result);

}