const search = (posts, s) => {
    const stringPredicate = (post) => {
        return post.title.includes(s) || post.content.includes(s) || post.username.includes(s);
    };

    return posts.filter(stringPredicate);
};

export { search };
