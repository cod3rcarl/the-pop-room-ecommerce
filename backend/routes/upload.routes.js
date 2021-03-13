const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const aws = require('aws-sdk');

const router = express.Router();

////////////////// UPLOAD TO AMAZON//////////////////*/

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_ACCESS_SECRET,
});

const uploadToS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'the-pop-room',
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      const ext = path.extname(file.originalname);

      cb(null, `${file.fieldname}-${Date.now()}-${ext}`);
    },
  }),
});

function checkFileType(file, cb) {
  console.log(file);
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimtype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only');
  }
}
////////////////// UPLOAD TO DISK STORAGE//////////////////*/

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'uploads/');
  },
  filename(req, file, callback) {
    const filetypes = /jpg|jpeg|png/g;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (extname) {
      return callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    } else {
      callback('Images only');
    }
  },
});

const upload = multer({
  storage,
});

router.post('/', uploadToS3.single('image'), (req, res) => {
  try {
    res.send(`${req.file.location}`);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
