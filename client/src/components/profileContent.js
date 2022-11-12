import React, { useState } from "react";
import ProfileAside from "./ProfileAside";
import AddAdventure from "./AddAdventure";
import AdventureList from "./AdventureList";
import { Col, Row } from "react-bootstrap";
import DailyCharacter from "./DailyCharacter";

const ProfileContent = () => {
    const [currentComponent, setCurrentComponent] = useState("addAdventure");

    const renderComponent = () => {
        if (currentComponent === "addAdventure") {
            return <AddAdventure />
        }
        if (currentComponent === "viewYourAdventure") {
            return <AdventureList />
        }
        // last one will be view contributions
    }

    const handleComponentChange = (component) => setCurrentComponent(component);

    return (
        <div>
            {/* We are passing the currentComponent from state and the function to update it */}
            {/* <ProfileAside currentComponent={currentComponent} handleComponentChange={handleComponentChange} /> */}

            <Row>
                <Col>
                    <ProfileAside currentComponent={currentComponent} handleComponentChange={handleComponentChange} />
                </Col>
                <Col>
                    <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
                        Your Profile
                    </h2>
                    {renderComponent()}
                </Col>
                <Col>
                    <h2>Random Character</h2>
                    <DailyCharacter />
                </Col>
            </Row>

            {/* Here we are calling the renderComponent method which will return a component  */}

        </div>
    );

}

export default ProfileContent;
