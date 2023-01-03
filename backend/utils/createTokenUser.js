const createTokenUser = (user) => {
  return { user: user.firstname, userId: user._id, role: user.role };
};

module.exports = createTokenUser;
