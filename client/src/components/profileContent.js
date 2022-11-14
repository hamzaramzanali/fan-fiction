import React, { useState,useEffect } from "react";
import ProfileAside from "./ProfileAside";
import AddAdventure from "./AddAdventure";
import AdventureList from "./AdventureList";
import { Col, Row } from "react-bootstrap";
import DailyCharacter from "./DailyCharacter";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import '../css/profilePage.css'

const ProfileContent = () => {
    const [currentComponent, setCurrentComponent] = useState("addAdventure");
    
const { data } = useQuery(QUERY_ME);

     const user = data?.me || data?.user || [];
    
    const renderComponent = () => {
        if (currentComponent === "addAdventure")
        {
            return <AddAdventure />
        }
        if (currentComponent === "viewYourAdventure")
        {
            return <AdventureList adventures={user.adventures} />
        }
        // last one will be view contributions
    }

    const handleComponentChange = (component) => setCurrentComponent(component);

    return (
        <>
            <div>
                {/* We are passing the currentComponent from state and the function to update it */}

                <Row className="profileAlignment">
                    <Col>
                        <ProfileAside currentComponent={currentComponent} handleComponentChange={handleComponentChange} className="profileAside mt-3" />
                    </Col>
                    <Col className="profileContent">
                        <h2 className="profileHead col-12 col-md-10 text-light p-3 mb-5">
                            Your Adventures
                        </h2>
                        {renderComponent()}
                    </Col>
                    <Col className="characterCol">
                        <h2 className="characterTitle">Random Character</h2>
                        <DailyCharacter />
                    </Col>
                </Row>

                {/* Here we are calling the renderComponent method which will return a component  */}

            </div>
        </>
    );

}

export default ProfileContent;
