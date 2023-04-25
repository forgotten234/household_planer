import {Types, Document} from 'mongoose';
import { User } from './User';

interface PurchaseItem extends Document{
  title: string;
  type: string;
  price: number;
  owner: Types.ObjectId | User;
}

interface PurchaseItemTest {
  id?: string;
  title?: string;
  type?: string;
  price?: number;
  owner?: Types.ObjectId | User;
}

export {PurchaseItem, PurchaseItemTest}