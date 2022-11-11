import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }  
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
      }
    }
  }
`;

export const ADD_ADVENTURE = gql`
mutation addAdventure($adventureTitle: String!, $adventureBody: String!) {
    addAdventure(adventureTitle: $adventureTitle, adventurebody: $adventureBody) {
            _id
            adventureTitle
            adventureBody
            createdAt
      }
    }
`;

export const ADD_COMMENT = gql`
  mutation addComment($adventureId: ID!, $commentText: String!) {
    addComment(adventureId: $adventureId, commentText: $commentText) {
      _id
      adventureText
      adventureAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;