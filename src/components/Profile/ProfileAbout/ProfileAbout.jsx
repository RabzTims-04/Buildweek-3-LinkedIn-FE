import React, {Component} from "react";
import {Card, Image, Nav} from "react-bootstrap";
import {Pencil} from "react-bootstrap-icons";

import ProfileAboutUpdater from "./AboutProfileUpdater";
import "../ProfilePage.css";
import {withRouter} from "react-router";

const { REACT_APP_BACKEND_URL } = process.env
class ProfileAbout extends Component {
  state = {
    showModalAbout: false,
  };
  closeAboutModal = () => {
    this.setState({showModalAbout: false});
  };
  render() {
    return (
      <>
        <Card className="my-2" id="aboutProfile">
          <Card.Title id="aboutProfile_title" className="mt-1">
            <span>{this.props.title}</span>
            {this.props.match.params.id === "60f67bd86bce175ba8dec1d7" ? (
              <Pencil
                id="pencil-icon"
                onClick={() => this.setState({showModalAbout: true})}
              />
            ) : (
              <></>
            )}
          </Card.Title>
          <Card.Body id="aboutProfile_body">
            <Card.Text>
              <p>{this.props.bio}</p>
            </Card.Text>
          </Card.Body>
        </Card>
        <ProfileAboutUpdater
          open={this.state.showModalAbout}
          close={this.closeAboutModal}
        />
      </>
    );
  }
}
export default withRouter(ProfileAbout);
