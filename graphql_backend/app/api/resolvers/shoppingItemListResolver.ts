import {GraphQLError} from 'graphql';
import { ShoppingItem } from '../../interfaces/ShoppingItem';
import { ShoppingItemList } from '../../interfaces/ShoppingItemList';

import shoppingItemModel from '../models/shoppingItemModel';
import shoppingItemListModel from '../models/shoppingItemListModel';

import {Types} from 'mongoose';
import {User, UserIdWithToken} from '../../interfaces/User';

// TODO: create resolvers based on cat.graphql
// note: when updating or deleting a cat, you need to check if the user is the owner of the cat
// note2: when updating or deleting a cat as admin, you need to check if the user is an admin by checking the role from the user object
export default {
  Query: {
    shoppingItemLists: async (_parent: undefined, args: ShoppingItem, user: UserIdWithToken) => {
      // if (!user.token) {
      //   throw new GraphQLError('Not authorized', {
      //     extensions: {code: 'NOT_AUTHORIZED'},
      //   });
      // }
      // args.owner = user.id as unknown as Types.ObjectId;
      // return await shoppingItemModel.findById(args.id);
    },
  },
  Mutation: {
    safeShoppingListItemList: async (
      _parent: undefined,
      args: ShoppingItemList,
      user: UserIdWithToken,
    ) => {
      console.log(!user.token, args)
      if (!user.token) {

        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }
      args.owner = user.id as unknown as Types.ObjectId;
      const items = await shoppingItemModel.find({ _id: { $in: args.items } })
      args.items = items;
      const shoppingItemList = new shoppingItemListModel(args);
      return await shoppingItemList.save();
    },
  },
}