import mongoose, {Types} from 'mongoose';
import {ShoppingItemList} from '../../interfaces/ShoppingItemList'
import { User } from '../../interfaces/User';
import shoppingItemModel from './shoppingItemModel'
const shoppingItemListModel = new mongoose.Schema<ShoppingItemList>({
  title: {
    type: String,
    required: true
  },
  // items: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'ShoppingItem',
  //   required: true
  // }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

export default mongoose.model<ShoppingItemList>('ShoppingItemList', shoppingItemListModel);