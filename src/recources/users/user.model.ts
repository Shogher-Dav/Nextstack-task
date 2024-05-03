import mongoose, { Schema } from 'mongoose';
import IUser from './user.types';

export interface UserDocument extends IUser, mongoose.Document {}

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<UserDocument>('User', UserSchema);
