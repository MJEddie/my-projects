const postContainer = $('#posts-container');
const loading = $('.loader');
const filter = $('#filter');

let limit = 5;
let page = 1;

// Fetch posts form API
async function getPosts() {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    );

    const data = await res.json();

    return data;
}

// Show posts 
async function showPosts() {
    const posts = await getPosts();

    posts.forEach(post => {
        const postEl = $('<div></div>').appendTo(postContainer);
        postEl.addClass('post');
        postEl.html(`
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        `);
    });
}

// Show loader & fetch more posts
function showLoading() {
    loading.addClass('show');

    setTimeout(() => {
        loading.removeClass('show');

        setTimeout(() => {
            page++;
            showPosts();
        }, 300);
    }, 1000);
}

// Filter posts
function filterPosts(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    });
}

// Show initial posts
showPosts();

$(window).scroll(function() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }
});

document.getElementById('filter').addEventListener('input', filterPosts);