import mongoose from 'mongoose';
import {BankBalance} from '../../interfaces/BankBalance'

const bankBalanceModel = new mongoose.Schema<BankBalance>({
  accountName: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true
  },
  iban: {
    type: String,
    required: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

export default mongoose.model<BankBalance>('BankBalance', bankBalanceModel);