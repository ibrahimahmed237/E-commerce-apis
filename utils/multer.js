import multer from "multer";

const Storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const imageFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
    return cb(new appError("Allow only jpeg, jpg and png", 400), false);
  }
  cb(null, true);
};

const uploadSingle = multer({
  limits: {
    fileSize: 2000000,
  },
  storage: Storage,
  fileFilter: imageFilter,
}).single("image");

const uploadMultiple = multer({
  limits: {
    fileSize: 2000000,
  },
  storage: Storage,
  fileFilter: imageFilter,
}).array("images", 10);

export { uploadSingle, uploadMultiple };
