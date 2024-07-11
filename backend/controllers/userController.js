const User = require("../model/userModel.js");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (usernameCheck) {
      return res.json({
        msg: "Username or email already used",
        status: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({
      status: true,
      user,
    });
  } catch (e) {
    next(e);
  }
};
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      username: username,
    });

    if (!user) {
      return res.json({
        msg: "Username or password incorrect",
        status: false,
      });
    }
    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({
        msg: "Incorrect Username or password",
        status: false,
      });
    }
    delete user.password;
    return res.json({
      status: true,
      user,
    });
  } catch (e) {
    next(e);
  }
};
const  setAvatar = async(req,res,next) =>{
try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId,{
      isAvatarImageSet:true,
      avatarImage:avatarImage,
    });
    return res.json({
      isSet: userData.isAvatarImageSet,
      image:userData.avatarImage,
    });
} catch (error) {
  next(error)
}
}
const getAllUsers = async(req,res,next)=>{
  try {
    // console.log("getAllusers");
      const users = await User.find({_id: { $ne : req.params.id}}).select([
        "email",
        "username",
        "avatarImage",
        "_id"
      ]);
      return res.json(users);
  } catch (error) {
    next(error)
  }
}
module.exports = {
  register,
  login,
  setAvatar,
  getAllUsers,
};
