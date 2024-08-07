import dayjs from "dayjs";

const search = (posts, s, date) => {
    const stringPredicate = (post) => {
        return post.title.includes(s) || post.content.includes(s) || post.username.includes(s);
    };

    const datePredicate = (post) => {
        return dayjs(post.time).isSame(dayjs(date), "day");
    };

    let filteredPosts = posts.filter(stringPredicate);

    if (date) {
        filteredPosts = filteredPosts.filter(datePredicate);
    }
    return filteredPosts;
};

export { search };
