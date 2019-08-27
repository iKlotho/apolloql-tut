import http from 'http';
import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';


const getMe = async req => {
  const token = req.headers['x-token'];
  console.log("token is ", token)
  if (token) {
    try {
      return await jwt.verify(token, "wr3r23fwfwefwekwself.2456342.dawqdq");
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};

const eraseDatabaseOnSync = true;
const app = express();

app.use(cors());


const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models,
      };
    }

    if (req) {
      const me = await getMe(req);

      return {
        models,
        me: me,
        secret: 'wr3r23fwfwefwekwself.2456342.dawqdq',
      };
    }
  },
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }

  httpServer.listen({ port: 8000 }, () => {
    console.log("its on babayyy");
  })
  // app.listen({ port: 3000 }, () => {
  //   console.log('Server onn baby');
  // });
});


const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'rwieruch',
      email: 'hello@ri.com',
      password: 'rere',
      role: 'ADMIN',
      messages: [
        {
          text: 'Published to Road learn React',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
  await models.User.create(
    {
      username: 'ddavids',
      email: 'hello@rix.com',
      password: 'rere',
      messages: [
        {
          text: 'Happy to release ...',
        },
        {
          text: 'Published a complete ...',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
};
