// middleware/multer.js
import multer from "multer";
import path from "path";

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Create this folder if it doesn't exist
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}-${file.fieldname}${ext}`);
    },
});

// File filter (optional: allow only images)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    cb(null, isValid);
};

const upload = multer({ storage, fileFilter });

export default upload;
