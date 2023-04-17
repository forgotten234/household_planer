import {GraphQLError} from 'graphql';
import { ShoppingItem } from '../../interfaces/ShoppingItem';
import shoppingItemModel from '../models/shoppingItemModel';
import {Types} from 'mongoose';
import {User, UserIdWithToken} from '../../interfaces/User';

// TODO: create resolvers based on cat.graphql
// note: when updating or deleting a cat, you need to check if the user is the owner of the cat
// note2: when updating or deleting a cat as admin, you need to check if the user is an admin by checking the role from the user object
export default {
  Query: {
    shoppingItemById: async (_parent: undefined, args: ShoppingItem, user: UserIdWithToken) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }
      args.owner = user.id as unknown as Types.ObjectId;
      return await shoppingItemModel.findById(args.id);
    },
    shoppingItemsByUser: async (_parent: undefined, args: ShoppingItem, user: UserIdWithToken) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }
      return await shoppingItemModel.find({owner: user.id});
    },
  },
  Mutation: {
    createShoppingListItem: async (
      _parent: undefined,
      args: ShoppingItem,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }
      args.owner = user.id as unknown as Types.ObjectId;
      const shoppingItem = new shoppingItemModel(args);
      return await shoppingItem.save();
    },
  },
}