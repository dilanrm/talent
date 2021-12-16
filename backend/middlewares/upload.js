let multer = require("multer");
const path = require("path");

module.exports.files = {
  storage: function (table) {
    let storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./static/publics/");
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + table + "_" + file.originalname);
      },
    });

    return storage;
  },

  allowedFile: (req, file, cb) => {
    const validFileTypes = /jpg|jpeg|png/; // Create regex to match jpg and png

    // Do the regex match to check if file extenxion match
    const extname = validFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (extname === true) {
      // Return true and file is saved
      return cb(null, true);
    } else {
      // Return error message if file extension does not match
      return cb("Images Only!");
    }
  },
};
