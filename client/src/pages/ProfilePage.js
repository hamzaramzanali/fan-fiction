import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// import ProfileAside from '../components/ProfileAside';
import AddAdventure from '../components/AddAdventure';

import { QUERY_ME } from '../utils/queries';
// QUERY_USER,

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
      });
  
      const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() === userParam) {
    return <Navigate to="/profile" />;
  }

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!user?.username) {
        return (
            <h4>
                You need to be logged in to see this. Use the navigation links above to
                sign up or log in!
            </h4>
        );
    }

    return (
        <div>
            <div className="flex-row justify-center mb-3">
                <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
                    Viewing {userParam ? `${user.username}'s` : 'your'} profile.
                </h2>
                {!userParam && (
                    <div
                        className="col-12 col-md-10 mb-3 p-3"
                        style={{ border: '1px dotted #1a1a1a' }}
                    >
                        <AddAdventure />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
