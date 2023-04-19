import mongoose, {Types, Document} from 'mongoose';
import { User } from './User';

interface ShoppingItem extends Document{
  title: string;
  type: 'food' | 'beverage' | 'other';
  description: string;
  owner: Types.ObjectId | User;
}

interface ShoppingItemTest {
  id?: string;
  title?: string;
  type?: 'food' | 'beverage' | 'other';
  description?: string;
  owner?: Types.ObjectId | User;
}

export {ShoppingItem, ShoppingItemTest}