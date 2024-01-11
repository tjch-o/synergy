const multer = require("multer");

const postImageStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads/posts");
    },
    fileName: (req, file, callback) => {
        callback(null, Date.now() + "-" + file.originalname);
    },
});

const profilePicStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads/profile pics");
    },
    fileName: (req, file, callback) => {
        callback(null, Date.now() + "-" + file.originalname);
    },
});

const uploadPostImage = multer({ storage: postImageStorage });
const uploadProfilePic = multer({ storage: profilePicStorage });

module.exports = { uploadPostImage, uploadProfilePic };
