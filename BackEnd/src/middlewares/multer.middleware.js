import multer from "multer";
console.log(" from multer ")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
console.log("multer storage",storage)
export const upload = multer({ 
    storage, 
})