import mongoose, {Types, Document} from 'mongoose';
import { User } from './User';
import {ShoppingItem} from './ShoppingItem'
interface ShoppingItemList extends Document{
  title: string;
  items: Types.ObjectId[] | ShoppingItem[];
  owner: Types.ObjectId | User;
}

interface ShoppingItemListTest {
  id?: string;
  title?: string;
  items?: Types.ObjectId[] | ShoppingItem[];
  owner?: Types.ObjectId | User;
}

export {ShoppingItemList, ShoppingItemListTest}