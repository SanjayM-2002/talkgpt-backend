import { Request, Response } from 'express';
import { z } from 'zod';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcrypt';

const signupInput = z.object({
  fullname: z.string().min(1, { message: 'Fullname cannot be empty' }),
  email: z.string().min(1).email({ message: 'This is not a valid email' }),
  password: z
    .string()
    .min(8, { message: 'Password should have minimum 8 characters' }),
});

const loginInput = z.object({
  email: z.string().min(1).email({ message: 'This is not a valid email' }),
  password: z
    .string()
    .min(8, { message: 'Password should have minimum 8 characters' }),
});

const signup = async (req: Request, res: Response) => {
  const signupBody = req.body;
  try {
    // console.log('body is: ', signupBody);
    const zodResponse = signupInput.safeParse(signupBody);
    if (!zodResponse.success) {
      return res.status(411).json(zodResponse.error.message);
    }
    const isUserExist = await User.findOne({ email: zodResponse.data.email });
    if (isUserExist) {
      return res
        .status(400)
        .json({ error: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(zodResponse.data.password, salt);
    console.log('hashed password is: ', hashedPassword);
    const newUser = new User({
      fullname: zodResponse.data.fullname,
      email: zodResponse.data.email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    generateToken(savedUser._id.toString(), res);
    return res.status(201).json({
      _id: savedUser._id,
      fullname: savedUser.fullname,
      email: savedUser.email,
    });
  } catch (error) {
    console.log('Error caught is: ', error.message);
    return res
      .status(500)
      .json({ error: 'Server error', errorDetails: error.message });
  }
};

export { signup };
