import React, { useState, useEffect } from "react";
import ProfileAside from "./ProfileAside";
import AddAdventure from "./AddAdventure";
import AdventureList from "./AdventureList";
import { Col, Row, Container } from "react-bootstrap";
import DailyCharacter from "./DailyCharacter";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import '../css/profilePage.css'

const ProfileContent = () => {
    const [currentComponent, setCurrentComponent] = useState("addAdventure");

    const { data } = useQuery(QUERY_ME);

    const user = data?.me || data?.user || [];

    const renderComponent = () => {
        if (currentComponent === "addAdventure") {
            return <AddAdventure />
        }
        if (currentComponent === "viewYourAdventure") {
            return <AdventureList adventures={user.adventures} />
        }
    }

    const handleComponentChange = (component) => setCurrentComponent(component);

    return (
        <>
            <Container>
                <Row className="profileAlignment">
                    <Col>
                        <ProfileAside currentComponent={currentComponent} handleComponentChange={handleComponentChange} className="profileAside mt-3" />
                    </Col>
                    <Col xs={5} className="profileContent">
                        {renderComponent()}
                    </Col>
                    <Col className="characterCol">
                        <h2 className="characterTitle">Random Character</h2>
                        <DailyCharacter />
                    </Col>
                </Row>
            </Container>
        </>
    );

}

export default ProfileContent;
