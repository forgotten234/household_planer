import mongoose, {Types} from 'mongoose';
import {ShoppingItem} from '../../interfaces/ShoppingItem'
import { User } from '../../interfaces/User';

const shoppingItemModel = new mongoose.Schema<ShoppingItem>({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

export default mongoose.model<ShoppingItem>('ShoppingItem', shoppingItemModel);