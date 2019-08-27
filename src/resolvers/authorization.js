import { ForbiddenError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { me }) =>  {
    console.log("me", me);
    return me ? skip : new ForbiddenError('Not auth as a user.');
}

export const isAdmin = combineResolvers(
    isAuthenticated,
    (parent, args, { me: { role } }) =>
        role === 'ADMIN'
            ? skip
            : new ForbiddenError('Not auth as a admin.'),
);

export const isMessageOwner = async (
    parent,
    { id },
    { models, me },
) => {
    const message = await models.Message.findByPk(id, { raw: true });

    if ( message.userId !== me.id) {
        throw new ForbiddenError('Not authenticated as owner.');
    }

    return skip;
}