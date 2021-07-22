import {Component} from "react";
import {Modal, Form, Image, Col, Button} from "react-bootstrap";

const {REACT_APP_BACKEND_URL} = process.env;
export default class ProfileExpImgUpdater extends Component {
  state = {
    experience: {
      role: "",
      company: "",
      area: "",
      description: "",
      startDate: "",
      endDate: null,
      image: "",
    },
  };
  onFileChange = (event) => {
    this.setState({experience: {image: event.target.files[0]}});
  };
  handleUpdateExp = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile", this.state.experience.image);
    e.preventDefault();
    console.log("Gonna submit Exp now");
    console.log(this.state.experience);
    let expId = this.props.idExp;
    console.log(expId);
    // const userId = "60c73bf1291930001560aba3";
    const endpointPUTExp = `${REACT_APP_BACKEND_URL}/profile/60f67bd86bce175ba8dec1d7/experiences/${expId}`;
    try {
      let response = await fetch(endpointPUTExp, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.experience),
      });
      console.log(response.ok);
      if (response.ok) {
        alert("Experience saved!");
        this.setState({
          selected: "",
          experience: {
            role: "",
            company: "",
            area: "",
            description: "",
            startDate: "",
            endDate: null,
          },
        });
      } else {
        alert("We have another issue");
      }
    } catch (err) {
      console.log(err);
    }
  };

  inputChange = (e) => {
    let id = e.target.id;
    this.setState({
      experience: {...this.state.experience, [id]: e.target.value},
    });
  };

  render() {
    const {image} = this.state.experience;
    return (
      <>
        <Modal size="lg" show={this.props.open} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Update {this.props.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(e) => this.handleUpdateExp(e)}>
              <Form.Group as={Col}>
                <Form.Label>{image}</Form.Label>
                <Image src={image} />
                <Form.Control
                  id="image"
                  type="file"
                  placeholder={this.props.image}
                  onChange={this.onFileChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Save changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
