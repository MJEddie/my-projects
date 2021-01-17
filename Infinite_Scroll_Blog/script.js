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