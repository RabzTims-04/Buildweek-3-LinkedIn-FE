import React, {Component} from "react";
import {Card, Col, Row, Image} from "react-bootstrap";
import {Plus} from "react-bootstrap-icons";
import "../ProfilePage.css";
import ProfileExperienceSingle from "./ProfileExperienceSingle";
import ProfileExperiencePost from "./ProfileExperiencePost";
import {withRouter} from "react-router-dom";

const {REACT_APP_BACKEND_URL} = process.env;
class ProfileExperience extends Component {
  state = {
    selected: null,
    experience: [],
    showModalExpPost: false,
  };

  closeExpModalPost = () => {
    this.setState({showModalExpPost: false});
  };
  componentDidMount = async () => {
    const userId =
      this.props.match.params.id === "60f67bd86bce175ba8dec1d7"
        ? "60f67bd86bce175ba8dec1d7"
        : this.props.match.params.id;
    const endpointGetMyProfile = `${REACT_APP_BACKEND_URL}/profile/${userId}/experiences`;
    try {
      let getResponse = await fetch(endpointGetMyProfile);

      let myExpData = await getResponse.json();
      console.log("myExperience", myExpData);
      this.setState({experience: myExpData});
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const {experience, selected} = this.state;
    return (
      <>
        <Card className="my-2" id="expProfile">
          <Card.Title id="expProfile_title" className="mt-3 mb-3 mx-3">
            <span>{this.props.title}</span>
            {this.props.match.params.id === "60f67bd86bce175ba8dec1d7" ? (
              <Plus
                id="pencil-icon"
                onClick={() => this.setState({showModalExpPost: true})}
              />
            ) : (
              <></>
            )}
          </Card.Title>
          <Card.Body id="expProfile_body" className="pt-0 mt-0">
            {experience.map((exp) => (
              <Col>
                <ProfileExperienceSingle
                  role={exp.role}
                  location={exp.area}
                  date={exp.startDate}
                  company={exp.company}
                  desc={exp.description}
                  selected={selected}
                  id={exp._id}
                  image={
                    exp.image
                    // "https://res.cloudinary.com/dmqsfltrf/image/upload/v1607933865/linkedin/d5ncpqvqrjwdxixjuyjr.ico"
                  }
                />
              </Col>
            ))}
          </Card.Body>
        </Card>
        <ProfileExperiencePost
          open={this.state.showModalExpPost}
          close={this.closeExpModalPost}
        />
      </>
    );
  }
}
export default withRouter(ProfileExperience);
