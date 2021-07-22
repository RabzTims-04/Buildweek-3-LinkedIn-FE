import {Component, createRef, React} from "react";
import {Modal, Form, Row, Col, Button, Image} from "react-bootstrap";
import {CameraFill} from "react-bootstrap-icons";
const {REACT_APP_BACKEND_URL} = process.env;
export default class ProfilePicUpdater extends Component {
  state = {user: {}};

  onFileChange = (event) => {
    this.setState({user: {image: event.target.files[0]}});
  };

  handleProfileUpdate = async (e) => {
    const formData = new FormData();
    formData.append("profile", this.state.user.image);
    // const userId = "60c8aef9a3a3d700151cb054";
    const endpointPUTprofile = `${REACT_APP_BACKEND_URL}/profile/60f67bd86bce175ba8dec1d7/picture`;

    try {
      let response = await fetch(endpointPUTprofile, {
        method: "POST",
        body: formData,
      });
      console.log(response.ok);
      if (response.ok) {
        alert("Profile Updated!");
        this.setState({
          user: {
            image: "",
          },
        });
      } else {
        alert(
          "We have some kind of issue, don't ask me - it's for you to solve"
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const modalStyle = {
      // background: "black",
      overflow: "hidden",
      padding: 0,
      borderTop: "grey solid 1px",
    };

    return (
      <>
        <Modal size="lg" show={this.props.open} onHide={this.props.close}>
          <Form onSubmit={(e) => this.handleProfileUpdate(e)}>
            <Modal.Body style={modalStyle} className="bg-dark">
              <Row className="p-5 text-center">
                <Col>
                  <Image id="jumboProfile_img_update" src={this.props.image} />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer className="bg-dark text-white" style={modalStyle}>
              <Row className="text-center flex-fill align-items-center">
                <Col xs={8} className="mt-2">
                  <Form.Group>
                    <Form.Control
                      id="image"
                      type="file"
                      placeholder={this.props.image}
                      onChange={this.onFileChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <CameraFill
                    onClick={(e) => this.handleProfileUpdate(e)}
                    type="submit"
                  />
                  <p>Update Photo</p>
                </Col>
              </Row>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
}
