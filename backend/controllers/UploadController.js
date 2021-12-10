let multer = require("multer");
const path = require("path");
let fileUpload = require("../middlewares/upload");
const { user, talent_image } = require("../models");

class UploadController {
  static userImg(req, res) {
    // const id = +req.params.id;

    let upload = multer({
      storage: fileUpload.files.storage("user"),
      limits: { fileSize: 20000000 },
      fileFilter: fileUpload.files.allowedFile,
    }).single("avatar");
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        res.json({ message: err });
      } else if (err) {
        res.json({ message: err });
      } else {
        const { id } = req.userData;
        try {
          const result = await user.update(
            {
              avatar: `http://localhost:3000/static/publics/${req.file.filename}`,
            },
            { where: { id } }
          );
          console.log(req.file);
          res.status(200).json(result);
        } catch (err) {
          res.status(500).json(err);
        }
        // res
        //   .status(200)
        //   .json({ message: "success", destination: req.file.filename });
      }
    });
    console.log(req.file);
  }

  static prodImg(req, res) {
    let upload = multer({
      storage: fileUpload.files.storage("talents"),
      limits: { fileSize: 20000000 },
      fileFilter: fileUpload.files.allowedFile,
    }).single("avatar");
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        res.json({ message: err });
      } else if (err) {
        res.json({ message: err });
      } else {
        console.log(req.file);
        try {
          // console.log(id)
          const { primary } = req.body;
          primary === "true" ? true : false;
          const result = await talent_image.create({
            filename: `http://localhost:3000/static/publics/${req.file.filename}`,
            filesize: req.file.size,
            file_type: path.extname(req.file.filename),
            primary: primary,
          });

          // const output = await talent_image.update(
          //   { talendId: id },
          //   { where: { id: result.id } }
          // );

          // console.log(talent_image.update(
          //   { talendId: id },
          //   { where: { id: result.id } }
          // ))

          res.status(200).json(result);
        } catch (err) {
          res.status(500).json(err);
        }
        // res
        //   .status(200)
        //   .json({ message: "success", destination: req.file.filename });
      }
    });
  }
}

module.exports = UploadController;
