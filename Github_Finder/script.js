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

// Show profile
function showProfile(user) {
    $('#profile').html(`
        <div class="card card-body border-0">
            <div class="row">
                <div class="col-md-3">
                    <img class="img-fluid rounded-circle mb-2" src="${user.avatar_url}">
                    <h5 class="mt-2 text-center">${user.name}</h5>
                    <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
                </div>
                <div class="col-md-9">
                    <div class="container mt-2 px-0">
                        <span class="badge badge-primary ml-5">Public Repos: ${user.public_repos}</span>
                        <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
                        <span class="badge badge-success">Followers: ${user.followers}</span>
                        <span class="badge badge-info">Following: ${user.following}</span>
                    </div>
                    <ul class="list-group list-group-flush mt-2 ml-5">
                        <li class="list-group-item">Company: ${user.company}</li>
                        <li class="list-group-item">Website/Blog: ${user.blog}</li>
                        <li class="list-group-item">Location: ${user.location}</li>
                        <li class="list-group-item">Member Since: ${user.created_at}</li>
                        <li class="list-group-item">Currently Updated: ${user.updated_at}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <h3 class="page-heading mb-3">Latest Repos</h3>
            <div id="repos"></div>
        </div>
    `);
}

// Event linstener
searchBtn.click(function() {
    userName = searchUser.val();
    getUserData(userName);
    searchUser.val('');
})