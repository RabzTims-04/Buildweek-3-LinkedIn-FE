import React from "react";
import {Container, Row, Col, Card, Button, Image} from "react-bootstrap";
import {useState, useEffect} from "react";
import {Avatar} from "@material-ui/core";
import banner from "./banner.jpg";
import "../HomePage/SidebarLeft/SidebarLeft.css";
import "./NetworkFeed.css";
import {XLg} from "react-bootstrap-icons";
import {Nav} from "react-bootstrap";

const {REACT_APP_BACKEND_URL} = process.env;
const NetworkFeed = () => {

  const [profiles, setProfiles] = useState([]);
  const getProfile = async () => {
    console.log("FIRST BEER");
    try {
      let response = await fetch(
        `${REACT_APP_BACKEND_URL}/profile`);

      console.log(response);

      let profiles = await response.json();
      console.log(profiles);

      setProfiles(profiles);
      console.log("Profiles", profiles);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("BEER");

    getProfile();
  }, []);
  return (
    <div>
      <Container>
        <Row xs={4} className={{display: "flex"}}>
          {profiles.map((profile) => {
            return (
              <Col style={{padding: "10px"}}>
                <Card className="networkFeedCard">
                  <Image className="feedLeft-cover-img" src={banner} />
                  <XLg className="xCricleFill" />

                  <Avatar
                    variant="top"
                    src={profile.image}
                    style={{
                      width: "100px",
                      height: "100px",
                      display: "flex",
                      position: "absolute",
                      marginLeft: "60px",
                      marginTop: "30px",
                    }}
                  />
                  <Card.Body>
                    <Card.Title
                      className="networkFeed"
                      style={{marginTop: "50px"}}
                    >
                      <h2>{profile.name + " " + profile.surname || ""}</h2>
                    </Card.Title>
                    <Card.Text className="networkFeed">
                      <p>{profile.title}</p>
                    </Card.Text>
                    <Nav.Link
                      href={`/profile/${profile._id}`}
                      id="sidebar_person"
                    >
                      <Button className="networkFeedButton">Connect</Button>
                    </Nav.Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default NetworkFeed;
