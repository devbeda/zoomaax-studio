import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname).toLowerCase();
    if (ext === ".jpeg") ext = ".jpg";  // Convert .jpeg to .jpg
    cb(null, Date.now() + ext);
  },
});

// Multer file filter
const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
        cb(null, true)
    }else {
        cb(new Error("Invalid file type. Oly images and video are allowed."), false)
    }
}
export const upload = multer({ storage,fileFilter });