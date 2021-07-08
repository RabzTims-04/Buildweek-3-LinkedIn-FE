import React, {Component} from "react";
import {Col, Row, Container, Form} from "react-bootstrap";
// import MainFeed from "./MainFeed/MainFeed";
import SidebarLeftMain from "./SidebarLeft/SidebarLeftMain";
import "./SidebarLeft/SidebarLeft.css";
import Sidebar from "./Sidebar/Sidebar";
import PostFeed from "./PostFeed/PostFeed";
import MyLoader from "../Loaders/MyLoader";
import GetPosts from "../HomePage/MainFeed/GetPosts";
import "./HomePage.css";
import NetworkFeed from "../Network/NetworkFeed";

// 8/7/21 Bearer token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGFmODNiYmJlOWIxNTAwMTU1MDZlMTgiLCJpYXQiOjE2MjU3NDg1MjAsImV4cCI6MTYyNjk1ODEyMH0.gz9X9tcreCrPoh2HafMSBJLP6ge_-UgPhn-LejUdyJc

export default class HomePage extends Component {
  state = {
    user: {},
    back: false,
    backgroundColor: "#ecebeb",
    isLoading: false,
  };

  componentDidMount = async () => {
    this.setState({isLoading: true});
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGFmODNiYmJlOWIxNTAwMTU1MDZlMTgiLCJpYXQiOjE2MjU3NDg1MjAsImV4cCI6MTYyNjk1ODEyMH0.gz9X9tcreCrPoh2HafMSBJLP6ge_-UgPhn-LejUdyJc";
      const bearerTokenHedri = `Bearer ${token}`;

      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/me`,
        {
          headers: {
            Authorization: bearerTokenHedri,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("This is sidebar profile data", data);
        this.setState({user: data, isLoading: false});
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {user, isLoading} = this.state;
    return (
      <div
        className="linkedin-page"
        style={{
          backgroundColor: this.state.back ? "rgb(27,26,26)" : "#ecebeb",
          color: this.state.back ? "rgb(127,126,126)" : "rgb(27,26,26)",
        }}
      >
        <Form className="night-mode">
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Night Mode"
            data-onstyle="dark"
            onClick={() => {
              this.setState({
                back: !this.state.back,
              });
            }}
          />
        </Form>
        <Container>
          <Row>
            <Col xs={3}>
              <SidebarLeftMain user={user} isLoading={isLoading} />
            </Col>
            <Col xs={6}>
              <PostFeed user={user} isLoading={isLoading} />
              {this.state.isLoading === true ? (
                <MyLoader />
              ) : (
                <GetPosts isLoading={isLoading} />
              )}
            </Col>
            <Col xs={3}>
              <Sidebar isLoading={isLoading} back={this.state.back} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
