import './EditModal.css';
import { Modal, Button } from 'react-bootstrap';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AddExp from './AddExp';
import { BsPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';

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
           <div className="d-flex flex-row justify-content-center">
                <Modal.Title>Add Experience</Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Body className='modal-Body mt-4'>
            <AddExp addexp={this.props.addexp} />
          </Modal.Body>
          <Modal.Footer  className="pb-3 text-center justify-content-center">
          <div className="p-2 text-center">
                <Button 
                  className="badge-pill" 
                  variant="warning"
                  href={`${REACT_APP_BACKEND_URL}/profile/60f67bd86bce175ba8dec1d7/experiences/CSV`} 
                  type={Link}>
                      <strong>Download experiences</strong>
                </Button>
              </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withRouter(AddExpModal);
