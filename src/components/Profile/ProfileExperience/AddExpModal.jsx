import './EditModal.css';
import { Modal } from 'react-bootstrap';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AddExp from './AddExp';
import { BsPlus } from 'react-icons/bs';

const {REACT_APP_BACKEND_URL} = process.env;
class AddExpModal extends Component {
  state = {
    show: false,
    // profileData:null,
    // submitbtn:null
  };

  // componentDidUpdate =(prevProps)=>{
  //     if(prevProps.profileData !== this.props.profileData){
  //         this.setState({
  //             ...this.state,
  //             profileData:this.props.profileData
  //         })
  //     }
  // }

  // submit =(val)=>{
  //     this.setState({
  //         ...this.state,
  //         submitbtn:val
  //     })
  // }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  render() {
    return (
      <>
        <BsPlus
          className='mr-0 addexp'
          id='plusIcon'
          onClick={this.handleShow}
          size={30}
        />
        <Modal
          dialogClassName='my-modal'
          show={this.state.show}
          onHide={this.handleClose}
        >
          <Modal.Header className='edit-modal' closeButton>
            <Modal.Title>Add Experience</Modal.Title>
          </Modal.Header>
          <Modal.Body className='modal-Body mt-4'>
            <AddExp addexp={this.props.addexp} />
          </Modal.Body>
          <Modal.Footer>
            {/*  <Button 
                className="badge-pill savebtn" 
                variant="primary" 
                type="submit">
                    <strong>Save</strong>
                </Button> */}
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withRouter(AddExpModal);
