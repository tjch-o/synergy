const convertTime = (time) => {
    return new Date(time).toLocaleTimeString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });
};

module.exports = { convertTime };
