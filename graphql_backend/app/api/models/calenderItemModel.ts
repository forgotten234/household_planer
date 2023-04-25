import mongoose from 'mongoose';
import {CalenderItem} from '../../interfaces/CalenderItem'

const calenderItemModel = new mongoose.Schema<CalenderItem>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

export default mongoose.model<CalenderItem>('CalenderItem', calenderItemModel);