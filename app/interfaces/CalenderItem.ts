import {Types, Document} from 'mongoose';
import { User } from './User';

interface CalenderItem extends Document{
  title: string;
  description: string;
  date: Date;
  owner: Types.ObjectId | User;
}

interface CalenderItemTest {
  id?: string;
  title?: string;
  description?: string;
  date?: Date;
  owner?: Types.ObjectId | User;
}

export {CalenderItem, CalenderItemTest}