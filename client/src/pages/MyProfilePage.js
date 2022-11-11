return (
    <Container className="profile">
        <Row>
            <Col>
                <div>
                    <ProfileAside />
                </div>
            </Col>
            <Col xs={6}>
                <div className="flex-row justify-center mb-3">
                    <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
                        Viewing {userParam ? `${user.username}'s` : 'your'} profile.
                    </h2>
                    {!userParam && (
                        <div
                            className="col-12 col-md-10 mb-3 p-3"
                            style={{ border: '1px dotted #1a1a1a' }}
                        >
                        </div>
                    )}
                </div>
            </Col>
            <Col>Character of the day</Col>
        </Row>

    </Container>

);


export default Profile;
