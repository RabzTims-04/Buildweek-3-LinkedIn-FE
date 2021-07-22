import React, {Component} from "react";
import {Col, Row, Container, Button, Modal} from "react-bootstrap";

import Messaging from "./Messaging";
import ProfileCardOne from "./ProfileJumbo/ProfileCardOne";
import ProfileJumbo from "./ProfileJumbo/ProfileJumbo";
import ProfileAbout from "./ProfileAbout/ProfileAbout";
import ProfileUpdater from "./ProfileJumbo/ProfileJumboUpdater";
import ProfileExperience from "./ProfileExperience/ProfileExperience";
import Sidebar from "./Sidebar/Sidebar";
import {withRouter} from "react-router-dom";
import MyLoader from "../Loaders/MyLoader";
import YourDashboard from "./YourDashboard";
import ProfileStrength from "./ProfileStrength";

const {REACT_APP_BACKEND_URL} = process.env;
class ProfilePage extends Component {
  state = {
    user: {},
    isLoading: false,
  };

  componentDidMount = async () => {
    const userID =
      this.props.match.params.id === "60f67bd86bce175ba8dec1d7"
        ? "60f67bd86bce175ba8dec1d7"
        : this.props.match.params.id;
    // const userId = "60c73bf1291930001560aba3";

    this.setState({isLoading: true});
    const endpointGetMyProfile = `${REACT_APP_BACKEND_URL}/profile/${userID}`;
    try {
      let getResponse = await fetch(endpointGetMyProfile, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      let myProfileData = await getResponse.json();
      console.log(myProfileData);
      this.setState({user: myProfileData, isLoading: false});
    } catch (err) {
      console.log(err);
    }
  };

  componentDidUpdate = async () => {};

  render() {
    return (
      <>
        <Container>
          <Row>
            <Col>
              <Row>
                <ProfileUpdater />
                <Col xs={8}>
                  {this.state.isLoading === true ? (
                    <MyLoader />
                  ) : (
                   <ProfileCardOne/>
                  )}
                  {this.state.isLoading === true ? (
                    <MyLoader />
                  ) : (
                    <ProfileAbout bio={this.state.user.bio} title="About" />
                  )}
                  {this.props.match.params.id === "60f67bd86bce175ba8dec1d7" ? (
                    this.state.isLoading !== true ? (
                      <>
                       <div className='mt-3'>
                          <ProfileStrength />
                      </div>
                      <div className='mt-3'>
                        <YourDashboard />
                      </div>
                       </>
                    ) : (
                      <>
                        <MyLoader />
                      </>
                    )
                  ) : (
                    <></>
                  )}
                  {this.state.isLoading === true ? (
                    <MyLoader />
                  ) : (
                    <ProfileExperience title="Experience" />
                  )}
                </Col>
                <Col xs={4} className="mt-2">
                  <Sidebar user={this.state.user} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Messaging/>
        </Container>
      </>
    );
  }
}
export default withRouter(ProfilePage);
