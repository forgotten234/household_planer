import {GraphQLError} from 'graphql';
import { BankBalance } from '../../interfaces/BankBalance';
import bankBalanceModel from '../models/bankBalanceModel';
import {Types} from 'mongoose';
import {User, UserIdWithToken} from '../../interfaces/User';

export default {
  Query: {
    bankBalanceFromUser: async (_parent: undefined, args: User, user: UserIdWithToken) => {
      console.log(!user.token)
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }
      console.log(user)
      let id = args.id as unknown as Types.ObjectId
      return await bankBalanceModel.find({owner: id});
    },
  },
  Mutation: {
    createBankBalance: async (
      _parent: undefined,
      args: BankBalance,
      user: UserIdWithToken
    ) => {
        const numberOfBankAccounts = (await bankBalanceModel.find({owner: user.id})).length
        if (!user.token || numberOfBankAccounts > 0) {
          throw new GraphQLError('Not authorized', {
            extensions: {code: 'NOT_AUTHORIZED'},
          });
        }
        args.owner = user.id as unknown as Types.ObjectId;
        const bankBalance = new bankBalanceModel(args);
        return await bankBalance.save();
    },
    deleteBankBalanceFromUser: async (
      _parent: undefined,
      args: BankBalance,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }
      return await bankBalanceModel.findByIdAndDelete(args.id);
    },
    updateBankBalanceFromUser: async (
      _parent: undefined,
      args: BankBalance,
      user: UserIdWithToken
    ) => {
      console.log(!user.token, args)
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }
      return await bankBalanceModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
    },
  },
}