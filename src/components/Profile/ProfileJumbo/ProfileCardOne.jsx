import { Component } from 'react';
import { Link } from 'react-router-dom';
import { AiFillCamera } from 'react-icons/ai';
import EditModal from './EditModal';
import { Card, Row, Col, Button, Modal } from 'react-bootstrap';
import './ProfileCardOne.css';
import background from '../../../Assets/backgroundCover.png';

const {REACT_APP_BACKEND_URL} = process.env;

class ProfileCardOne extends Component {

  state={
    show:false,
    profPic:'',
    myProfile:null
  }

  postCardProfileImg = async (e)=>{
    let formData = new FormData()   
    formData.set('profile', this.state.myProfile.image)
    e.preventDefault()
    const url = `${REACT_APP_BACKEND_URL}/profile/60f67bd86bce175ba8dec1d7/picture`
    try {

      const response = await fetch(url,{
        method:'POST',
        body: formData,
      })
      const data = await response.json()
      console.log(data);
      const img = await data.image
      console.log(img);
      /* this.props.image(img) */
      if(response.ok){
        alert('pic posted')
        this.setState({
          ...this.state,
          profPic:img
        })
       
        
      }
      else{
        console.log('lets try again');
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  handleClose = () => {
    this.setState({
      ...this.state,
      show: false,
    });
  };

  handleShow = () => {
    this.setState({
      ...this.state,
      show: true,
    });
  };

  render() {

    return (
      <Card className='rounded'>
        <Card.Img className='cardImg' variant='top' src={background} />


                         <Link to="/">
                         <AiFillCamera className="camerabtn" style={{color:'blue', position:'absolute', right:'4%', top:'4%'}} size={20}/></Link>
                    
                    <Card.Body>                    
                    <img onClick={this.handleShow} className="profilePic img-fluid" src={this.state.profPic?this.state.profPic:this.props.profileData.image} alt="profile-pic"/> 

                    <Modal id="profileModal" dialogClassName='my-modal'
                      show={this.state.show}
                      onHide={this.handleClose}

                      >
                        
                      <Modal.Header closeButton onClick={(e) => {
                          this.handleClose();
                        }}>
                        <Modal.Title>Profile Photo</Modal.Title>
                      </Modal.Header>

                              <Modal.Body className="text-center">

                              <img className="modalProfilePic img-fluid" src={this.state.profPic?this.state.profPic:this.props.profileData.image} alt="profile-pic"/>
                                
                                </Modal.Body>
                                <Modal.Footer className="d-flex px-4 pt-0 flex-row justify-content-between">
                                   <div className="d-flex text-center">
                                      <Button variant="secondary" className="text-center d-flex flex-column pr-5">
                                       <div className="hoverBtn">
                                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="24" height="24" focusable="false">
                                        <path d="M21.13 2.86a3 3 0 00-4.17 0l-13 13L2 22l6.19-2L21.13 7a3 3 0 000-4.16zM6.77 18.57l-1.35-1.34L16.64 6 18 7.35z"></path>
                                      </svg>
                                       </div>
                                       <div>
                                         Edit
                                       </div>
                                      </Button>

                                      <Button className=" d-flex flex-column pr-5" variant="secondary">
                                      <div className="hoverBtn">
                                      <label className="p-0 d-flex mt-0 mr-0 mb-0 ml-3" for="postimg">
                                  
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
                                          <path d="M16 13a4 4 0 11-4-4 4 4 0 014 4zm6-4v11H2V9a3 3 0 013-3h1.3l1.2-3h9l1.2 3H19a3 3 0 013 3zm-5 4a5 5 0 10-5 5 5 5 0 005-5z"></path>
                                        </svg>
                                      
                                      </label>
                                          <input 
                                            /* onClick={(e)=> {e.stopPropagation()
                                            return true}} */
                                            style={{display:'none'}}
                                            type="file"
                                            title="choose"
                                            id="postimg"
                                            /* id="image" */
                                            onChange={(e) => {this.setState({
                                              ...this.state,
                                              myProfile:{...this.state.myProfile, 
                                                    image: e.target.files[0]}
                                            })
                                            console.log(e.target.files[0])}}                            
                                            />

                                      </div>
                                      <div>
                                        Upload
                                      </div>
                                      </Button>

                                      <Button onClick={(e)=>{this.postCardProfileImg(e)}} variant="secondary" className="d-flex flex-column pr-5">
                                        <div className="hoverBtn">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match ml-4" width="24" height="24" focusable="false">
                                        <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 13a1 1 0 01-.29.71L16 14l-2 2-6-6-4 4V7a1 1 0 011-1h14a1 1 0 011 1zm-2-7a2 2 0 11-2-2 2 2 0 012 2z"></path>
                                      </svg>
                                        </div>
                                        <div>
                                          Save changes
                                        </div>
                                      </Button>
                                      </div>
                              
                                      <div className="d-flex text-center">
                                      <Button variant="secondary" className="text-center d-flex flex-column">
                                       <div className="hoverBtn">
                                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match ml-2" width="24" height="24" focusable="false">
                                        <path d="M20 4v1H4V4a1 1 0 011-1h4a1 1 0 011-1h4a1 1 0 011 1h4a1 1 0 011 1zM5 6h14v13a3 3 0 01-3 3H8a3 3 0 01-3-3zm9 12h1V8h-1zm-5 0h1V8H9z"></path>
                                      </svg>
                                       </div>
                                       <div>
                                         Delete
                                       </div>
                                      </Button>
                                      </div>
                               
                                </Modal.Footer>
                          </Modal>
                                         
                        <Row className='mb-4 justify-content-between'>
                            <Col md={8} className="d-flex flex-column cardBody mt-4">
                                <h2>{this.props.profileData.name} {this.props.profileData.surname}</h2>
                                <span>{this.props.profileData.bio}</span>
                                <div className="d-inline mt-1">
                                    <span className="mr-2 text-muted">{this.props.profileData.area} .</span>
                                    <Link to="" style={{color:'blue'}}>
                                        <span>Contact info</span>
                                    </Link>                                   
                                </div>
                                <Link to="" style={{ color: 'blue' }} className='mt-1'>
                                  <p>19 connections</p>
                                </Link>
                                <div className="d-inline">
                                    <Button className="badge-pill btn1" variant="primary">Open to</Button>
                                    <Button className="badge-pill mx-2 btn2" variant="outline-secondary">Add section</Button>
                                    <Button className="badge-pill btn3" variant="outline-secondary">More</Button>                                   
                                </div>
                            </Col>
                            <Col className="text-right" md={4}>
                               <EditModal profileData={this.props.profileData} editInfo={this.props.editInfo}/>
                            </Col>
                        </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default ProfileCardOne;
