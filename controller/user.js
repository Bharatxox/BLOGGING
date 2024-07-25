const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    console.log(newUser);

    res.json({
      sucess: true,
      message: "SIGNUP Success",
    });
  } catch (err) {
    res.json({
      sucess: false,
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const user = User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        sucess: false,
        message: "INVALID EMAIL",
      });
    }
    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isPassword) {
      return res.status(400).json({
        sucess: false,
        message: "INVALID PASSWORD",
      });
    }
    //create a JWT token
    const currentTime = Math.floor(new Date().getTime() / 1000);
    const expirayTime = currentTime + 3600; //1 hour

    const jwtPayload = {
      userId: user._id,
      email: user.email,
      exp: expirayTime,
      name: user.firstName + " " + user.lastName,
    };

    const token = jwt.sign(jwtPayload, "MY_SECRET_KEY");
    await User.findByIdAndUpdate(user._id, {
      $set: { token: token },
    });
    res.json({
      sucess: true,
      message: "LOGIN SUCESSFUL",
      token: token,
    });
  } catch (err) {
    res.json({
      sucess: false,
      message: err.message,
    });
  }
};

const userController = { signup, login };

module.exports = userController;
