import mongoose, {Types} from 'mongoose';
import {ShoppingItemList} from '../../interfaces/ShoppingItemList'
 
const shoppingItemListModel = new mongoose.Schema<ShoppingItemList>({
  title: {
    type: String,
    required: true,
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShoppingItem',
    required: true
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

export default mongoose.model<ShoppingItemList>('ShoppingItemList', shoppingItemListModel);