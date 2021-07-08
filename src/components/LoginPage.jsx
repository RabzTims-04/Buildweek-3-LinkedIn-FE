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
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGFmODNiYmJlOWIxNTAwMTU1MDZlMTgiLCJpYXQiOjE2MjU3NDg1MjAsImV4cCI6MTYyNjk1ODEyMH0.gz9X9tcreCrPoh2HafMSBJLP6ge_-UgPhn-LejUdyJc";
    if (this.state.value === "Helena") {
      this.setState({
        user: {
          username: "Helena",
          bearerToken: `${token}`,
          userId: "60c73d8b291930001560aba5",
        },
      });
      this.props.history.push("/home");
    } else if (this.state.value === "Kapil") {
      this.setState({
        user: {
          username: "Kapil",
          bearerToken: `${token}`,
          userId: "60c73d8b291930001560aba5",
        },
      });
      this.props.history.push("/home");
    } else if (this.state.user === "Kristian") {
      this.setState({
        user: {
          bearerToken: "",
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
                    <option value="Helena">Select User</option>
                    <option value="Helena">Helena</option>
                    <option value="Kapil">Kapil</option>
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
