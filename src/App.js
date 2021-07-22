import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// main page is not useed right now;
import Profile from "./components/Profile/Profile.jsx"
import ProfilePage from "./components/Profile/ProfilePage.jsx";
import MyNav from "./components/MyNav/MyNav";
import MyFooter from "./components/MyFooter/MyFooter";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage/HomePage";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import NetworkFeed from "./components/Network/NetworkFeed";
import People from "./components/PeopleProfile/People";
import {Component} from "react";

const {REACT_APP_BACKEND_URL} = process.env;
class App extends Component {

  state = {
    user: "", 
    isLoading: "",
    img:"",
    carl:"",
    kristian:"",
    updatedVal:""
  };
  
  profile = (pic) => {
    this.setState({
      ...this.state,
      img: pic
    });
  }; 
  
  /* RABZ */

  RabzData = async () => {
    this.setState({isLoading: true});
    try {
      const response = await fetch(
        `${REACT_APP_BACKEND_URL}/profile/60f67bd86bce175ba8dec1d7`);
      if (response.ok) {
        const data = await response.json();
        console.log("This is sidebar profile data", data);
        this.setState({
          ...this.state,
          user: data, 
          isLoading: false});
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* CARL */
  Carldata = async () => {
    this.setState({isLoading: true});
    try {
      const response = await fetch(
        `${REACT_APP_BACKEND_URL}/profile/60f9250aa7c01a0015e927d7`);
      if (response.ok) {
        const data = await response.json();
        console.log("This is carls profile data", data);
        this.setState({
          ...this.state,
          carl: data, 
          isLoading: false
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  userVal =(val) => {
    this.setState({
      ...this.state,
      updatedVal: val
    })
  }

  /* Kristian */

  Kristiandata = async () => {
    this.setState({isLoading: true});
    try {
      const response = await fetch(
        `${REACT_APP_BACKEND_URL}/profile/60f9984d327c0e0015990695`);
      if (response.ok) {
        const data = await response.json();
        console.log("This is kristian's profile data", data);
        this.setState({
          ...this.state,
          kristian: data, 
          isLoading: false
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = () => {
    this.RabzData();
    this.Carldata();
    this.Kristiandata()
  }

  componentDidUpdate = async(prevProps, prevState)=> {
    if(prevState.updatedVal !== this.state.updatedVal){
      this.RabzData();
      this.Carldata();
      this.Kristiandata()
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <MyNav user={this.state.user} />
          <Switch>
            <Route exact path="/network" component={NetworkFeed} />
            <Route exact path="/">
              <LoginPage 
              user={this.state.user.image} 
              carl={this.state.carl}
              kristian={this.state.kristian} 
              change={this.userVal} />
            </Route>
            <Route exact path="/home">
              <HomePage />
            </Route>
            <Route
                exact
                path='/profile/:id'
                render={(routerProps) => (
                  <Profile {...routerProps} /* profilePic={this.profile} */ />
                )}
              />
            {/* <Route exact path="/profile/:id" component={ProfilePage} /> */}
            <Route
                exact
                path='/profile/:username/:userId'
                render={(routerProps) => <People {...routerProps} />}
              />
          </Switch>
          <MyFooter />
        </Router>
      </div>
    );
  }
}

export default App;
