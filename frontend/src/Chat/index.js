import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';


const GET_CURRENT_USER = gql`
{
    me {
        id
        username
        role
    }
}
`;

const GET_MESSAGES = gql`
{
  message(id: 1) {
    id
    text
  }

}
`;

const Chat = () => (
    <Query query={GET_MESSAGES}>
      {({ data, loading }) => {
        const { message } = data;

        if (loading || !message) {
            return <div>Loading ...</div>;
        }
  
        return (
          <div>
            {message.id} {message.text}
          </div>
        );
      }}
    </Query>
  );
export default Chat;