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
    addAdventure(adventureTitle: $adventureTitle, adventureBody: $adventureBody) {
            _id
            adventureTitle
            adventureBody
            createdAt
      }
    }
`;

export const REMOVE_ADVENTURE = gql`
mutation removeAdventure($adventureId: ID!) {
  removeAdventure(adventureId: $adventureId) {
            _id
            adventureTitle
            adventureBody
            createdAt
      }
    }
`;

export const SAVE_CHARACTER = gql`
  mutation saveCharacter($characterInput: CharacterInput) {
    saveCharacter(characterInput: $characterInput){
        _id
        username
        savedCharacters {
          characterId
          name
          description
          image
        }
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


export const DELETE_ADVENTURE = gql`
  mutation removeAdventure($adventureId: ID!) {
    removeAdventure(adventureId: $adventureId) {
      _id
    } 
  }
`; 


