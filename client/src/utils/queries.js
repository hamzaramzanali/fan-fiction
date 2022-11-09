import { gql } from '@apollo/client';

// GET_ME query will return these fields
export const GET_ME = gql`
    query {
        me {
            _id
            username
            email
        }
    }
`;
