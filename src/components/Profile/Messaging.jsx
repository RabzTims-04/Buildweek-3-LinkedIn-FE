import { Component } from 'react';
import './messaging.css';
//icons
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';

import Chat from './Chat';

import { Link } from 'react-router-dom';


const {REACT_APP_BACKEND_URL} = process.env;
class Messaging extends Component {

  state= {
    messaging: false,
    Profiles: []
  }
  componentDidMount=() => {
    this.fetchMessages()
  }

  fetchMessages = async () => {
    try {
      const response = await fetch(`${REACT_APP_BACKEND_URL}/profile`);
      const data = await response.json();
      console.log("messagind",data);
      if(response.ok){
        this.setState({
          ...this.state,
          Profiles: data
        })
      }
    } catch (error) {
      console.log(error);
    }

  }
render(){
  return (
    <div
      className='Messaging'
      style={
        this.state.messaging
          ? { transform: 'translateY(0)' }
          : { transform: 'translateY(90%)' }
      }
    >
      <div className='header_messaging'>
        <div className='messaging_head'>
          <img
            src=''
            alt=''
          />
          <h5>Messaging</h5>
        </div>
        <div className='icons'>
          <div className='icon'>
            <EditOutlinedIcon />
          </div>
          <div className='icon'>
            <MoreHorizOutlinedIcon />
          </div>
          <div className='icon' onClick={() => this.setState({...this.state, messaging: !this.state.messaging})}>
            <KeyboardArrowDownOutlinedIcon />
          </div>
        </div>
      </div>
      <hr />
      <div className='messagin_body'>
        <input type='text' placeholder='Search messages' />
        {this.state.Profiles && this.state.Profiles.slice(0, 5).map((p) => (
          <Link to={'/profile/' + p.name + '/' + p._id}>
            <Chat p={p} />
          </Link>
        ))}
      </div>
    </div>
  );
}
};

export default Messaging;
