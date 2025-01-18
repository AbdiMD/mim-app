const multer = require('multer');

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/'); // Specify the directory to save files
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname); // Unique file name
    },
  });
  
  // File filter to accept only images
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  };
  
const upload = multer({ storage: storage, fileFilter: fileFilter });
  
module.exports = upload;