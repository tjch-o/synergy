const sortByProperty = (arr, property) => {
    return arr.sort((a, b) => {
        if (typeof a[property] == "Date") {
            return a[property] - b[property];
        }

        if (a[property] < b[property]) {
            return -1;
        } else if (a[property] > b[property]) {
            return 1;
        }
        return 0;
    });
};

export { sortByProperty}