var api = {
    // To get all post list
    getAllPost() {
        var url = 'https://jsonplaceholder.typicode.com/posts';
        return fetch(url).then((res) => res.json());
    },
    // To get post detail of particular post that is clicked
    getDetailPost(id) {
        var url = 'https://jsonplaceholder.typicode.com/posts/' + id;
        return fetch(url).then((res) => res.json());
    },
    // To get comments of particular post
    getCommentsPost(id) {
        var url = 'https://jsonplaceholder.typicode.com/posts/' + id + '/comments';
        return fetch(url).then((res) => res.json());
    }
};

export default api;