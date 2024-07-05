import { Response } from 'express';
import jwt from 'jsonwebtoken';

const generateToken = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '5d',
  });
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 5 * 24 * 60 * 60 * 1000,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
  console.log('token: ', token);

  return token;
};

export default generateToken;
