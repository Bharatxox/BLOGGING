const User = require("../model/user");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    // 1. if token is present in header
    if (!bearerToken) {
      return res.status(401).json({
        status: false,
        message: "token is not present",
      });
    }

    // 2.check if token is valid or not
    const token = bearerToken.split(" ")[1];
    jwt.verify(token, "MY_SECRET_KEY");

    // 3. decode the data of token and check if the token is expired or not
    const tokenData = jwt.decode(token);
    const currentTime = Math.floor(new Date().getTime() / 1000);
    if (currentTime > tokenData.exp) {
      res.status(401).json({ status: false, message: "token is expired" });
    }

    // 4. check if any user is available of the token
    const user = await User.findById(tokenData.userId);
    if (!user)
      req.status(401).json({ status: false, message: "user not found" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = authMiddleware;
