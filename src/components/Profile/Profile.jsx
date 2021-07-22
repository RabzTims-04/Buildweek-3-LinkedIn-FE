import { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Profile.css';
import ProfileCardOne from '../Profile/ProfileJumbo/ProfileCardOne';
import ProfileStrength from './ProfileStrength';
import RProfileCardOne from '../Profile/ProfileJumbo/RProfileCardOne';
import YourDashboard from './YourDashboard';
import PeopleAlsoViewed from '../Profile/ProfileJumbo/PeopleAlsoViewed';
import Learning from '../Profile/ProfileJumbo/Learning';
import Experience from '../Profile/ProfileJumbo/Experience';
/* import Dashboard from './Dashboard'; */
import Messaging from './Messaging';

const {REACT_APP_BACKEND_URL} = process.env;
class Profile extends Component {
  state = {
    profileData: [],
  };

  editInfo = (editInfo) => {
    if (editInfo) {
      this.setState({
        profileData: editInfo,
      });
      /* this.props.setprofiles(editInfo); */
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    //console.log('state', prevState);
    if (
      prevState.profileData.name !== this.state.profileData.name ||
      prevState.profileData.surname !== this.state.profileData.surname ||
      prevState.profileData.email !== this.state.profileData.email ||
      prevState.profileData.username !== this.state.profileData.username ||
      prevState.profileData.title !== this.state.profileData.title ||
      prevState.profileData.bio !== this.state.profileData.bio ||
      prevState.profileData.area !== this.state.profileData.area ||
      prevState.profileData.image !== this.state.profileData.image
    ) {
      this.fetchData();
    } else {
      //console.log('not changed');
    }
  };

  componentDidMount = () => {
    this.fetchData();
  };

  fetchData = async () => {
    try {
      const url = `${REACT_APP_BACKEND_URL}/profile/60f67bd86bce175ba8dec1d7`;
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        //console.log(data);
        this.setState({
          profileData: data,
        });
       /*  this.props.profilePic(this.state.profileData?.image); */
        //console.log(this.state.profileData?.image);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Container fluid>
        <Row className='justify-content-between profilePage'>
          <Col lg={8} md={12} className=' d-flex flex-column'>
            <div>
              <ProfileCardOne
                editInfo={this.editInfo}
                profileData={this.state.profileData}
              />
            </div>

            <div className='mt-3'>
              <ProfileStrength />
            </div>

            <div className='mt-3'>
              <YourDashboard />
              {/* <Dashboard /> */}
            </div>

            <div className='mt-3'>
              <Experience />
            </div>
          </Col>

          <Col lg={4} className=' d-flex flex-column d-md-none d-lg-block'>
            <RProfileCardOne />
            {/* <RProfileCardTwo/> */}
            <PeopleAlsoViewed />
            <Learning />
            {/* Carls Components */}
          </Col>
        </Row>
        <Messaging />
      </Container>
    );
  }
}

export default Profile;
