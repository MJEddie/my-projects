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
        }
    });
}