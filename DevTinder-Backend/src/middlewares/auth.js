const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Read the token from the request cookies
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).send("Please Login");
    }

    // Verify token
    const decodedObj = jwt.verify(token, process.env.JWT_SECRET);

    // use the correct key name (id, not _id)
    const user = await User.findById(decodedObj.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = { userAuth };
