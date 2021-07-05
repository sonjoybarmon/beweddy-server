const jwt = require("jsonwebtoken");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const User = require("../Models/user");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + Date.now() + "-" + file.originalname);
  },
});
exports.upload = multer({ storage });



//jwt token middleware for required sign in
exports.protect = async(req, res, next) => {

  if (req.headers.authorization) {

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    req.user = user;
    next();

  } else {

    return res.status(400).json({ message: "Authorization required" });
  }
};



exports.userMiddleware = (req, res, next) => {

  if (req.user.role !== "user") {
    return res.status(400).json({ message: "User access denied" });
  }
  next();
};



exports.adminMiddleware = (req, res, next) => {

  if (req.user.role !== "admin") {

    return res.status(400).json({ message: "Admin access denied" });

  } else {
    
    next();
  }
};
