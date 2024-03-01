import multer from 'multer';

//multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date() + '_' + file.originalname);
  },
});

const upload = multer({
  storage: multerStorage
});

export default upload;