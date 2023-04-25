import {GraphQLError} from 'graphql';
import { CalenderItem } from '../../interfaces/CalenderItem';
import calenderItemModel from '../models/calenderItemModel';
import {Types} from 'mongoose';
import {User, UserIdWithToken} from '../../interfaces/User';

// TODO: create resolvers based on cat.graphql
// note: when updating or deleting a cat, you need to check if the user is the owner of the cat
// note2: when updating or deleting a cat as admin, you need to check if the user is an admin by checking the role from the user object
export default {
  Query: {
    calenderItemsFromUser: async (_parent: undefined, args: User, user: UserIdWithToken) => {
      console.log("fadfsdfadaflk")
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }
      return await calenderItemModel.find({owner: args.id});
    },
  },
  Mutation: {
    createCalenderItem: async (
      _parent: undefined,
      args: CalenderItem,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }
      args.owner = user.id as unknown as Types.ObjectId;
      const calenderItem = new calenderItemModel(args);
      return await calenderItem.save();
    },
    deleteCalenderItemFromUser: async (
      _parent: undefined,
      args: CalenderItem,
      user: UserIdWithToken
    ) => {
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }
      return await calenderItemModel.findByIdAndDelete(args.id);
    },
    updateCalenderItemFromUser: async (
      _parent: undefined,
      args: CalenderItem,
      user: UserIdWithToken
    ) => {
      console.log(!user.token, args)
      if (!user.token) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }
      return await calenderItemModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
    },
  },
}