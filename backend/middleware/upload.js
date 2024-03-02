const multer = require('multer');
const fs = require('fs-extra');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const categoryName = req.body.categoryName;

    // Create a folder with the categoryName in the 'uploads' directory
    const categoryPath = `uploads/${categoryName}`;
    fs.mkdirsSync(categoryPath);

    // Use the 'uploads/category' directory as the destination for storing the file
    cb(null, 'uploads/category');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const extension = file.originalname.split('.').pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
  }
});


const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter
});

module.exports = upload;