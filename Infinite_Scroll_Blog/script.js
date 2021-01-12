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

// Show initial posts
showPosts();