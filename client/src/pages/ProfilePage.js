import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import "../css/profilePage.css";
import Container from 'react-bootstrap/Container';
import ProfileContent from '../components/profileContent';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = () => {
    const { username: userParam } = useParams();

    const { loading, data } = useQuery(QUERY_ME);

    const user = data?.me || data?.user || [];
    // navigate to personal profile page if username is yours
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/profile" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!user?.username) {
        return (
            <>
                <h4>
                    You need to be logged in to see this. Use the navigation links above to
                    sign up or log in!
                </h4>
            </>
        );
    }
    return (
        <>
            <Container className="profile">
                <ProfileContent />
            </Container>
        </>

    );
};

export default Profile;
