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
            obj.account = res.login !== null ? res.login : '';
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
        },
        error: function(res) {
            data = res.responseJSON.message;
            if (data === 'Not Found') {
                showAlert(data, 'alert alert-danger');
            }
        }
    });
}

function getRepoData() {
    $.ajax({
        url: `https://api.github.com/users/${userName}/repos?per_page=5&sort=created: asc`,
        method: 'GET',
        dataType: 'json',
        success: function(res) {
            data = res;
            showRepos(data);
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
                    <h6 class="mt-2 text-center text-secondary">${user.account}</h6>
                    <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
                </div>
                <div class="col-md-9">
                    <div class="container mt-2 px-0">
                        <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                        <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
                        <span class="badge badge-success">Followers: ${user.followers}</span>
                        <span class="badge badge-info">Following: ${user.following}</span>
                    </div>
                    <ul class="list-group list-group-flush mt-2">
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

//Show repo
function showRepos(repos) {
    repos.forEach(function(repo) {
        const repoData = $('<div class="card card-body mb-2  border-0"></div>').appendTo('#repos');
        let repoDes = repo.description !== null ? repo.description : '';
        repoData.html(`
                <div class="row shadow-sm p-3 bg-white rounded">
                    <div class="col-md-6">
                        <a href="${repo.html_url}" target="_blank">
                            <h3>${repo.name}</h3>
                        </a>
                        <p>${repoDes}</p>
                    </div>
                    <div class="col-md-6">
                        <span class="badge badge-warning m-1">Stars ${repo.stargazers_count}</span>
                        <span class="badge badge-success m-1">Watchers ${repo.watchers_count}</span>
                        <span class="badge badge-info m-1">Forks ${repo.forks_count}</span>
                    </div>
                </div>
        `);
    });
}

//Show alert
function showAlert(message, className) {
    const alertMessage = $('<div></div>').attr('class', className + ' text-center');
    alertMessage.text(`User "${userName}" is ${message}`);
    alertMessage.insertBefore($('.search.card.card-body.border-0'));
    $('#profile').html('');

    // clear display after 2 sec
    setTimeout(() => {
        alertMessage.remove();
    }, 2000);
}

// Event linstener
searchUser.keydown(function(e) {
    if (e.keyCode === 13) {
        userName = searchUser.val();
        getUserData(userName);
        getRepoData(userName);
        searchUser.val('');
    }
});
searchBtn.click(function() {
    userName = searchUser.val();
    getUserData(userName);
    getRepoData(userName);
    searchUser.val('');
});