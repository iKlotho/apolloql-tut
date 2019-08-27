import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, isMessageOwner } from './authorization';
import pubsub, { EVENTS } from '../subscription';

export default {
  Query: {
    messages: async (parent, args, { models }) => await models.Message.findAll(),
    message: async (parent, { id }, { models }) => await models.Message.findByPk(id),
  },
  Mutation: {
    createMessage: combineResolvers(
      isAuthenticated,
      async (parent, { text }, { me, models }) => {
        const message = await models.Message.create({
          text,
          userId: me.id,
        });

        pubsub.publish(EVENTS.MESSAGE.CREATED, {
          messageCreated: { message },
        });

        return message;
      },
    ),
    deleteMessage: combineResolvers(
      isAuthenticated,
      isMessageOwner,
      async (parent, { id }, { models }) => await models.Message.destroy({ where: { id } }),
    ),
    updateMessage: async (parent, { id, text }, { models }) => await models.Message.destory({ where: { id } }),
  },
  Message: {
    user: async (message, args, { models }) => await models.User.findByPk(message.userId),
  },
  Subscription: {
    messageCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.MESSAGE.CREATED),
    },
  },
};
