const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getAllUser = async (req, res) => {
  const users = await User.find({})
    .where({ role: "user" })
    .select("-password")
    .exec();
  res.status(StatusCodes.OK).json(users);
};

const showCurrentUser = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findOne({ _id: userId })
    .select("-password -role")
    .exec();
  res.status(StatusCodes.OK).json(user);
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password");
  res.status(StatusCodes.OK).json(user);
};

const updateProfile = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findOne({ _id: userId }).exec();
  if (!user) {
    throw new CustomError.UnauthenticateError(
      "you are not authorize to access this route"
    );
  }
  const updatedUser = await User.findByIdAndUpdate({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  }).exec();
  res.status(StatusCodes.OK).json(updatedUser);
};

const updateUserPassword = async (req, res) => {
  const { userId } = req.user;
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Please fill all provided field.");
  }

  const user = await User.findOne({ _id: userId }).exec();
  if (!user) {
    throw new CustomError.UnauthenticateError(
      "You are not authorize to access this route"
    );
  }
  const passwordMatch = await user.comparePassword(oldPassword);
  if (!passwordMatch) {
    throw new CustomError.BadRequestError("Wrong password, try again.");
  }
  user.password = newPassword;
  await user.save();
  res
    .status(StatusCodes.OK)
    .json({ message: "password has been change successfully" });
};

module.exports = {
  showCurrentUser,
  getAllUser,
  getSingleUser,
  updateProfile,
  updateUserPassword,
};
