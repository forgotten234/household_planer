import {Types} from 'mongoose';
declare global {
  namespace Express {
    interface User {
      email: string;
      password: string;
      role: 'user' | 'admin';
      user_name: string;
      _id: Types.ObjectId;
    }
  }
}
