import mongoose from 'mongoose';
import {PurchaseItem} from '../../interfaces/PurchaseItem'

const purchaseItemModel = new mongoose.Schema<PurchaseItem>({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

export default mongoose.model<PurchaseItem>('PurchaseItem', purchaseItemModel);