export default {
  Query: {
    room: (parent, { id }, { models }) => rooms[id],
    rooms: () => Object.values(rooms),
  },
  Room: {
    users: (parent, args, { me }) => {
      console.log('users', users);
      console.log('args', parent.users);
      return Object.values(users).filter(
        (user) => parent.users.find((id) => id === user.id),
      );
    },
  },
};
