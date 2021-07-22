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

const { REACT_APP_BACKEND_URL } = process.env

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
      const response = await fetch(`${REACT_APP_BACKEND_URL}/profile/60f67bd86bce175ba8dec1d7`);
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
            <Col lg={3} className='d-none d-lg-flex flex-column'>
              <SidebarLeftMain user={user} isLoading={isLoading} />
            </Col>
            <Col lg={6} className='d-flex flex-column'>
              <PostFeed user={user} isLoading={isLoading} />
              {this.state.isLoading === true ? (
                <MyLoader />
              ) : (
                <GetPosts user={user} isLoading={isLoading} />
              )}
            </Col>
            <Col lg={3} className=' d-flex flex-column'>
              <Sidebar isLoading={isLoading} back={this.state.back} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
