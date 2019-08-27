import Sequelize from 'sequelize';


const users = {
  1: {
    id: '1',
    username: 'Umut Kahrıman',
    messageIds: [1],
  },
  2: {
    id: '2',
    username: 'Dave',
    messageIds: [2],
  },
};

const rooms = {
  1: {
    id: '1',
    name: 'Jok',
    users: [''],
  },
  2: {
    id: '2',
    name: 'Jurassic Park',
    users: ['1', '2'],
  },
};

const messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'By World',
    userId: '2',
  },
};

const sequelize = new Sequelize(
  {
    username: 'postgres',
    password: 'ayk542msf572shr',
    database: 'mobichat',
    host: '212.58.23.116',
    dialect: 'postgres',
    operatorsAliases: false,
  },
);

const models = {
  User: sequelize.import('./user'),
  Message: sequelize.import('./message'),
};


Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
