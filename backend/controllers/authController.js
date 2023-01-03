const User = require("../models/user");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticateError,
} = require("../errors");
const { StatusCodes } = require("http-status-codes");
const createTokenUser = require("../utils/createTokenUser");
const setJwtToken = require("../utils/setJwtToken");
const attachCookiesToResponse = require("../utils/attachCookiesToResponse");

const signup = async (req, res) => {
  const { email, firstname, lastname, password, address, phonenumber } =
    req.body;
  if (
    !email ||
    !firstname ||
    !lastname ||
    !password ||
    !address ||
    !phonenumber
  ) {
    throw new BadRequestError("Please provide value for all field");
  }
  const alreadyExist = await User.findOne({ email: email }).lean().exec();
  if (alreadyExist) {
    throw new BadRequestError(
      "User already exist, please try a different email address"
    );
  }
  const firstAccount = (await User.countDocuments({})) === 0;
  req.body.role = firstAccount ? "admin" : "user";
  const newUser = await User.create(req.body);
  const userData = createTokenUser(newUser);
  const token = setJwtToken(userData);
  attachCookiesToResponse({ res, token });
  res.status(StatusCodes.CREATED).json(token);
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide your email and password");
  }
  const user = await User.findOne({ email }).exec();
  if (!user) {
    throw new UnauthenticateError("This user does not exist");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticateError("Incorrect credentials");
  }

  const userData = createTokenUser(user);
  const token = setJwtToken(userData);
  attachCookiesToResponse({ res, token });
  res.status(StatusCodes.OK).json(token);
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });

  res.status(StatusCodes.OK).json({ message: "Successfully logged out" });
};

module.exports = {
  signup,
  signin,
  logout,
};
