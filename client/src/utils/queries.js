import { gql } from '@apollo/client';

// GET_ME query will return these fields
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      adventures {
          _id
          adventureTitle
          adventureBody
          adventureAuthor
          createdAt
      }
      savedCharacters {
          characterId
          name
          description
          image
      }
    }
  }
`;


export const QUERY_ADVENTURES = gql`
  query getAdventures {
    getAdventures {
      _id
      adventureTitle
      adventureBody
      adventureAuthor
      createdAt
    }
  }
`;

export const QUERY_USER_ADVENTURES = gql`
  query getAdventuresFromUser {
    adventures {
      username
    }
  }
`;


export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      adventures {
        _id
        adventureTitle
        adventureBody
        createdAt
      }
    }
  }
`;

export const QUERY_SINGLE_ADVENTURE = gql`
  query adventure($adventureId: ID!) {
    adventure(adventureId: $adventureId) {
      _id
      adventureTitle
      adventureBody
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;
