const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

//storage
const multerStorage = multer.memoryStorage();

//file type checking

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    //rejected files
    cb(
      {
        message: "File type not allowed",
      },
      false
    );
  }
};

exports.photoUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 10000000,
  },
});

exports.profilePhotoResize = async (req, res, next) => {
  //check if there is no file
  if (!req.file) return next();
  req.file.filename = `user-${Date.now()}-${req.file.originalname}`;

  await sharp(req.file.buffer)
    .resize(250, 250)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(path.join(`public/images/profile/${req.file.filename}`));
  next();
};

exports.postPhotoResize = async (req, res, next) => {
  //check if there is no file
  if (!req.file) return next();
  req.file.filename = `user-${Date.now()}-${req.file.originalname}`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(path.join(`public/images/posts/${req.file.filename}`));
  next();
};
