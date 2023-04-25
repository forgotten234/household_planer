import {GraphQLError} from 'graphql';
import { PurchaseItem } from '../../interfaces/PurchaseItem';
import purchaseItemModel from '../models/purchaseItemModel';
import {Types} from 'mongoose';
import {User, UserIdWithToken} from '../../interfaces/User';

export default {
  Query: {
    purchaseItemsFromUser: async (_parent: undefined, args: User, user: UserIdWithToken) => {
      console.log("fadfsdfadaflk")
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }
      return await purchaseItemModel.find({owner: args.id});
    },
  },
  Mutation: {
    createPurchaseItem: async (
      _parent: undefined,
      args: PurchaseItem,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }
      args.owner = user.id as unknown as Types.ObjectId;
      const purchaseItem = new purchaseItemModel(args);
      return await purchaseItem.save();
    },
    deletePurchaseItemFromUser: async (
      _parent: undefined,
      args: PurchaseItem,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }
      return await purchaseItemModel.findByIdAndDelete(args.id);
    },
    updatePurchaseItemFromUser: async (
      _parent: undefined,
      args: PurchaseItem,
      user: UserIdWithToken
    ) => {
      console.log(!user.token, args)
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }
      return await purchaseItemModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
    },
  },
}