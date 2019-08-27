import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    rooms: [Room!]!
    room(id: ID!): Room
  }

  type Room {
    id: ID!
    name: String!
    users: [User!]!
  }
`;
