import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET;

  return jwt.sign({ userId }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export default generateToken;