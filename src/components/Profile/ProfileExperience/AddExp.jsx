import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Button, Form } from 'react-bootstrap';
import './EditExp.css';

const {REACT_APP_BACKEND_URL} = process.env;
export class AddExp extends Component {
  state = {
    addExp: {
      role: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
      area: '',
      username:"rabztims"
    },
  };

  SaveExp = (e) => {
    let id = e.currentTarget.id;
    let Exp = { ...this.state.addExp };
    Exp[id] = e.currentTarget.value;
    this.setState({ addExp: Exp });
  };

  addExp = async (e) => {
    let formData = new FormData()
    formData.append('experience', this.state.addExp.image)
    e.preventDefault();
    const url =
      `${REACT_APP_BACKEND_URL}/profile/60f67bd86bce175ba8dec1d7/experiences`;
    try {
      //console.log(this.state.addExp)
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          role:this.state.addExp.role,
          company:this.state.addExp.company,
          startDate:this.state.addExp.startDate,
          endDate:this.state.addExp.endDate,
          description:this.state.addExp.description,
          area:this.state.addExp.area,
          username:this.state.addExp.username
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const addedExp = await response.json();
      const id = await addedExp._id
      console.log('postid', id);
      if (response.ok) {
        if(this.state.addExp.image){
          try {
            const postimgresp = await fetch(url +'/' + id +'/picture',{
              method:'POST',
              body:formData,
              headers:{
            }
            })
            console.log(postimgresp);
            
          } catch (error) {
            console.log('addpostimage error',error);
          }
        }
        this.props.addexp(addedExp);
        //console.log(addedExp);
        alert('Experience Added');
        this.setState({
          ...this.state.addExp,
        });
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Role *</Form.Label>
            <Form.Control
              type='text'
              placeholder='Front-end developer'
              onChange={(e) => this.SaveExp(e)}
              id='role'
            />
          </Form.Group>
          <label className="p-0 d-flex mt-2" for="image">                                     
                    <input 
                        onClick={(e)=> {e.stopPropagation()
                          return true}}  
                          /* style={{display:'none'}} */
                          type="file"
                          id="image"
                          /* id="image" */
                          onChange={(e) => {this.setState({
                            addExp:{...this.state.addExp, 
                            image: e.target.files[0]}
                          })
                          console.log(e.target.files[0])}}
                                />
                         </label>

          <Form.Group className='mb-4'>
            <Form.Label>Company *</Form.Label>
            <Form.Control
              type='text'
              placeholder='Ex: Microsoft'
              id='company'
              onChange={(e) => this.SaveExp(e)}
            />
          </Form.Group>

          <Form.Group className='mb-4'>
            <Form.Label>Location *</Form.Label>
            <Form.Control
              type='text'
              placeholder='Ex: London, United Kingdom'
              onChange={(e) => this.SaveExp(e)}
              id='area'
            />
          </Form.Group>

          <Row className='mb-4'>
            <Col lg={6}>
              <Form.Group className='mb-3'>
                <Form.Label>Start date</Form.Label>
                <Form.Control
                  type='date'
                  id='startDate'
                  onChange={(e) => this.SaveExp(e)}
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className='mb-3'>
                <Form.Label>End date</Form.Label>
                <Form.Control
                  type='date'
                  id='endDate'
                  onChange={(e) => this.SaveExp(e)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className='mb-4'>
            <Form.Label>Description *</Form.Label>
            <Form.Control
              as='textarea'
              id='description'
              onChange={(e) => this.SaveExp(e)}
            />
          </Form.Group>
          <Button
            onClick={(e) => {
              this.addExp(e);
            }}
            variant='primary'
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default AddExp;
