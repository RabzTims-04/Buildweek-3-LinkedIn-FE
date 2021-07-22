import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {
  Container,
  Dropdown,
  Button,
  Image,
  Col,
  Row,
  DropdownButton,
} from "react-bootstrap";
import {Redirect} from "react-router-dom";

class LoginPage extends Component {
  state = {value: "select user", bearerToken: "", userId: ""};

  handleChange = (event) => {
    this.setState({value: event.target.value});
  };

  handleSubmit = (event) => {
    alert("The user seleceted is: " + this.state.value);
    event.preventDefault();
  };

  checkUser = () => {
    if (this.state.value === "Rabz") {
      this.setState({
        user: {
          username: "Rabz",
          userId: "60f67bd86bce175ba8dec1d7",
        },
      });
      this.props.history.push("/home");
    } else if (this.state.value === "Carl") {
      this.setState({
        user: {
          username: "Carl",
          userId: "",
        },
      });
      this.props.history.push("/home");
    } else if (this.state.user === "Kristian") {
      this.setState({
        user: {
          userId: "",
        },
      });
    }
  };

  render() {
    return (
      <>
        <Container className="p-5 bg-light text-center vh-75">
          <Row>
            <Col xs={4}></Col>
            <Col xs={4}>
              <Image src={"https://picsum.photos/200"} id="loginPage_img" />
              <h2>{this.state.value}</h2>
              <form onSubmit={this.handleSubmit}>
                <label>
                  <select value={this.state.value} onChange={this.handleChange}>
                    <option value="Rabz">Select User</option>
                    <option value="Rabz">Rabz</option>
                    <option value="Carl">Carl</option>
                    <option value="Kristian">Kristian</option>
                  </select>
                </label>
                <input type="submit" value="Submit" onClick={this.checkUser} />
              </form>
              {/* <Button onClick={this.selectUser}>Login</Button> */}
            </Col>
            <Col xs={4}></Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default withRouter(LoginPage);
