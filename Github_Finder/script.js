const searchUser = $('#searchUser');
const searchBtn = $('.buscar-btn');
let userName;

// ajax API
function getUserData() {
    $.ajax({
        url: `https://api.github.com/users/${userName}`,
        method: 'GET',
        dataType: 'json',
        success: function(res) {
            let obj = {};
            obj.avatar_url = res.avatar_url !== null ? res.avatar_url : '';
            obj.name = res.name !== null ? res.name : '';
            obj.html_url = res.html_url !== null ? res.html_url : '';
            obj.public_repos = res.public_repos !== null ? res.public_repos : '';
            obj.public_gists = res.public_gists !== null ? res.public_gists : '';
            obj.followers = res.followers !== null ? res.followers : '';
            obj.following = res.following !== null ? res.following : '';
            obj.company = res.company !== null ? res.company : '';
            obj.blog = res.blog !== null ? res.blog : '';
            obj.location = res.location !== null ? res.location : '';
            obj.created_at = res.created_at.substr(0, 10) !== null ? res.created_at.substr(0, 10) : '';
            obj.updated_at = res.updated_at.substr(0, 10) !== null ? res.updated_at.substr(0, 10) : '';
            showProfile(obj);
        }
    });
}