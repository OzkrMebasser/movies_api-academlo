const multer = require('multer');
const path = require('path');
const { AppError } = require('./appError');


const storage = multer.diskStorage({
    // Donde se guardan los archivos
    destination: function (req, file, cb) {
     const destinationPath = path.join(__dirname,'..', 'images')
      cb(null, destinationPath)
    },

    // Como se llamarian los archivos
    filename: function (req, file, cb) {
      if(!file.mimetype.startsWith('image')){
          cb(new AppError(400, 'Must provide an image as a file'))
      }
      const [name, extension] = file.originalname.split('.');

      const fileName = `${file.originalname}-${Date.now()}.${extension}`;
      cb(null, fileName)
    }
  })
  
  const upload = multer({ storage: storage })