import {Types, Document} from 'mongoose';
import { User } from './User';

interface BankBalance extends Document{
  accountName: string;
  balance: number;
  iban: string;
  owner: Types.ObjectId | User;
}

interface BankBalanceTest {
  id?: string;
  accountName: string;
  balance?: number;
  iban?: string;
  owner?: Types.ObjectId | User;
}

export {BankBalance, BankBalanceTest}