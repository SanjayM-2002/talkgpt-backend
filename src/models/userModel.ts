import mongoose from 'mongoose';
const chatSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    chats: [chatSchema],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
