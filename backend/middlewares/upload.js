const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const uploadPath = path.join(__dirname, '../files');
        return cb(null, uploadPath);
    },
    filename: function(req, file, cb) {
        return cb(null, `${file.originalname}`)
    }
});

const upload = multer({storage});

module.exports = upload;