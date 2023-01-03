const CustomError = require("../errors");
const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticateError("Authentication invalid");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) throw new CustomError.UnauthenticateError("Forbidden");

    req.user = { user: decode.user, userId: decode.userId, role: decode.role };
    next();
  });
};

const authorizeUser = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

module.exports = {
  authorizeUser,
  authenticateUser,
};
