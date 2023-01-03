const attachCookiesToResponse = ({ res, token }) => {
  const oneDay = 60 * 60 * 24 * 1000;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    signed: true,
    secure: process.env.NODE_ENV === "production",
  });
};

module.exports = attachCookiesToResponse;
