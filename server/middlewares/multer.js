const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const multerMiddleware = async (req, res, next) => {
  try {
    console.log(req);
    const file = await upload.single("photo");
    file;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
};

module.exports = multerMiddleware;
