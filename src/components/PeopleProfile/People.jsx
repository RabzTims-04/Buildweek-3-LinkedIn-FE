import React, { useState, useEffect } from 'react';
import './People.css';
import { Container, Row, Card, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiFillCamera } from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai';
import { AiOutlineCheck } from 'react-icons/ai';
import Learning from './Learning';
import Messaging from '../Profile/Messaging';

const {REACT_APP_BACKEND_URL} = process.env;

const People = ({ match }) => {
  const id = match.params.userId;
  const [Profile, setProfile] = useState([]);
  const [people, setpeople] = useState([]);
  console.log(Profile);
  //console.log(Profile);
  useEffect(() => {
    fetch(`${REACT_APP_BACKEND_URL}/profile/${id}`)
      .then((response) => response.json())
      .then((data) => setProfile(data));
  }, [id]);
  useEffect(() => {
    fetch(`${REACT_APP_BACKEND_URL}/profile/`)
      .then((response) => response.json())
      .then((data) => setpeople(data.slice(0, 11)));
  }, []);
  //console.log(people);

  const img = {
    imglogo: [
      'https://media-exp1.licdn.com/dms/image/C560BAQHdAaarsO-eyA/company-logo_100_100/0/1595530301220?e=1631750400&v=beta&t=epCwObuNQ7fgzYahnWONi2D1ghbJkdq0i3EBX2oZiTE',
      'https://media-exp1.licdn.com/dms/image/C4D0BAQHiNSL4Or29cg/company-logo_100_100/0/1519856215226?e=1631750400&v=beta&t=V4NBm-NohF2bjS1mrIlkZq3-gKb49SpeBtV80UPFSR8',
      'https://media-exp1.licdn.com/dms/image/C560BAQE88xCsONDULQ/company-logo_100_100/0/1618231291419?e=1631750400&v=beta&t=BF5HxHU4xDnT0-hGNOzeWTxjcdx8SChkLzYJWfKA2TA',
      'https://media-exp1.licdn.com/dms/image/C560BAQGrV5i4K9YdhQ/company-logo_100_100/0/1621582241755?e=1631750400&v=beta&t=ouxs0fFm2EgInSZZSUXFZlVk6zuidkmNwmG7y6YVuRw',
    ],
  };
  return (
    <div className='people'>
      <Container fluid>
        <Row className='justify-content-between profilePage'>
          <Col lg={8} md={12} className='py-5 d-flex flex-column'>
            <div>
              <Card className='rounded'>
                <Card.Img
                  className='cardImg'
                  variant='top'
                  src='https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg'
                />

                <Link to='/'>
                  <AiFillCamera
                    className='camerabtn'
                    style={{
                      color: 'blue',
                      position: 'absolute',
                      right: '4%',
                      top: '4%',
                    }}
                    size={20}
                  />
                </Link>

                <Card.Body>
                  <img
                    className='profilePic img-fluid'
                    src={Profile.image}
                    alt='profile-pic'
                  />

                  <Row className='mb-4 justify-content-between'>
                    <Col md={8} className='d-flex flex-column cardBody mt-4'>
                      <h2>
                        {Profile.name} {Profile.surname}
                      </h2>
                      <span>{Profile.bio}</span>
                      <div className='d-inline mt-1'>
                        <span className='mr-2 text-muted'>
                          {Profile.area} .
                        </span>
                        <Link to='' style={{ color: 'blue' }}>
                          <span>Contact info</span>
                        </Link>
                      </div>
                      <Link to='' style={{ color: 'blue' }} className='mt-1'>
                        <p>19 connections</p>
                      </Link>
                      <div className='d-inline'>
                        <Button className='badge-pill btn1' variant='primary'>
                          Open to
                        </Button>
                        <Button
                          className='badge-pill mx-2 btn2'
                          variant='outline-secondary'
                        >
                          Add section
                        </Button>
                        <Button
                          className='badge-pill btn3'
                          variant='outline-secondary'
                        >
                          More
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
            <div className='mt-3'>
              <Card className='rounded'>
                <Card.Body>
                  <Form>
                    <Form.Group controlId='formBasicRange'>
                      <Form.Label>
                        <h5>
                          <span className='text-muted'>Profile Strength:</span>{' '}
                          Intermediate
                        </h5>
                      </Form.Label>
                      <Row className='px-4 pb-5' type='range'>
                        <Col className='customRange'></Col>
                        <Col className='customRange'></Col>
                        <Col className='customRange'></Col>
                        <Col className='customRange'></Col>
                        <Col className='customRange'></Col>
                        <Col className='customRange'>
                          <AiOutlineCheck className='tick' size={20} />
                        </Col>
                        <Col className='customRangeLast'>
                          <AiOutlineStar className='star' size={20} />
                        </Col>
                      </Row>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </div>
            <div className='mt-3'>
              <Card className='rounded dashboard-card'>
                <Container>
                  <Card.Title>Your Dashboard</Card.Title>
                  <Card.Subtitle className='mb-2 text-muted'>
                    <i>Private to you</i>
                  </Card.Subtitle>
                  <Row className='mt-3 justify-content-center'>
                    <Card className='dash1 d-flex flex-row w-100'>
                      <Col md={4}>
                        <Link to=''>
                          <p className='viewspan'>10</p>
                          <p className='mb-2 text-muted'>
                            Who viewed your profile
                          </p>
                        </Link>
                      </Col>

                      <Col
                        style={{
                          borderRight: '1px solid lightgrey',
                          borderLeft: '1px solid lightgrey',
                        }}
                        md={4}
                      >
                        <Link to=''>
                          <p className='viewspan'>10</p>
                          <p className='mb-2 text-muted'>Article views</p>
                        </Link>
                      </Col>

                      <Col md={4}>
                        <Link to=''>
                          <p className='viewspan'>10</p>
                          <p className='mb-2 text-muted'>Search appearances</p>
                        </Link>
                      </Col>
                    </Card>
                  </Row>

                  {/* New row */}

                  <Row className='mt-3'>
                    <Card className='dash2 d-flex flex-column w-100'>
                      <Col className='d-flex p-0 mt-3'>
                        <Col className='pr-0 pl-1'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            data-supported-dps='24x24'
                            fill='currentColor'
                            className='mercado-match'
                            width='24'
                            height='24'
                            focusable='false'
                          >
                            <path d='M21 12h-1a9 9 0 00-9-9V2a10 10 0 0110 10zM11 5v1a6 6 0 016 6h1a7 7 0 00-7-7zm3 7h1a4 4 0 00-4-4v1a3 3 0 013 3zm-2 0a1 1 0 00-1.82-.54L5.32 6.6a8 8 0 00-.24 8.4 2.33 2.33 0 014.16.68l.88 3.08A8.57 8.57 0 0012 19a8 8 0 004.4-1.32l-4.86-4.86A1 1 0 0012 12zm-5 3a1.32 1.32 0 00-1.27 1L4 22h6l-1.73-6A1.32 1.32 0 007 15z'></path>
                          </svg>
                        </Col>
                        <Col
                          className='p-0'
                          xl={11}
                          style={{ borderBottom: '1px solid lightgrey' }}
                        >
                          <Link to=''>
                            <span className=''>
                              Creator Mode: <span>Off</span>
                            </span>
                            <p className=' text-muted'>
                              Grow your audience and get discovered by
                              highlighting content on your profile
                            </p>
                          </Link>
                        </Col>
                      </Col>

                      <Col className='d-flex p-0  mt-3'>
                        <Col className='pr-0 pl-1'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            data-supported-dps='24x24'
                            fill='currentColor'
                            className='mercado-match'
                            width='24'
                            height='24'
                            focusable='false'
                          >
                            <path d='M12 16v6H3v-6a3 3 0 013-3h3a3 3 0 013 3zm5.5-3A3.5 3.5 0 1014 9.5a3.5 3.5 0 003.5 3.5zm1 2h-2a2.5 2.5 0 00-2.5 2.5V22h7v-4.5a2.5 2.5 0 00-2.5-2.5zM7.5 2A4.5 4.5 0 1012 6.5 4.49 4.49 0 007.5 2z'></path>
                          </svg>
                        </Col>
                        <Col
                          className='p-0'
                          xl={11}
                          style={{ borderBottom: '1px solid lightgrey' }}
                        >
                          <Link to=''>
                            <span className=''>My Network</span>
                            <p className=' text-muted'>
                              Manage your connections, events and interests.
                            </p>
                          </Link>
                        </Col>
                      </Col>

                      <Col className='d-flex p-0  mt-3'>
                        <Col className='pr-0 pl-1'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            data-supported-dps='24x24'
                            fill='currentColor'
                            width='24'
                            height='24'
                            focusable='false'
                          >
                            <path d='M12 9.88A2.13 2.13 0 119.88 12 2.13 2.13 0 0112 9.88M12 9a3 3 0 103 3 3 3 0 00-3-3zm9-4H3a1 1 0 00-1 1v12a1 1 0 001 1h18a1 1 0 001-1V6a1 1 0 00-1-1zM4 7h2.13A2.13 2.13 0 014 9.13V7zm0 10v-2.12A2.13 2.13 0 016.13 17H4zm16 0h-2.12A2.13 2.13 0 0120 14.88V17zm0-3a3 3 0 00-3 3H7a3 3 0 00-3-3v-4a3 3 0 003-3h10a3 3 0 003 3v4zm0-4.87A2.13 2.13 0 0117.88 7H20v2.13z'></path>
                          </svg>
                        </Col>
                        <Col
                          className='p-0'
                          xl={11}
                          style={{ borderBottom: '1px solid lightgrey' }}
                        >
                          <Link to=''>
                            <span className=''>Salary insights</span>
                            <p className=' text-muted'>
                              See how your salary compares to others in the
                              community.
                            </p>
                          </Link>
                        </Col>
                      </Col>

                      <Col className='d-flex p-0  mt-3'>
                        <Col className='pr-0 pl-1'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            data-supported-dps='24x24'
                            fill='currentColor'
                            className='mercado-match'
                            width='24'
                            height='24'
                            focusable='false'
                          >
                            <path d='M19 5a3 3 0 00-3-3H5v20l7-6.29L19 22z'></path>
                          </svg>
                        </Col>
                        <Col className='p-0' xl={11}>
                          <Link to=''>
                            <span className=''>My items</span>
                            <p className='text-muted'>
                              Keep track of your jobs, courses and articles.
                            </p>
                          </Link>
                        </Col>
                      </Col>
                    </Card>
                  </Row>

                  <Card.Body></Card.Body>
                </Container>
              </Card>
            </div>
            <div className='mt-3'>
              {' '}
              <Card className='rounded'>
                <Card.Body>
                  <Row className='justify-content-between'>
                    <Col>
                      <h6>Experience</h6>
                    </Col>
                    <Col className='text-right pr-0'></Col>
                  </Row>
                  <Row className='pl-2'>
                    <div className='dash2 d-flex flex-column w-100'>
                      <Col className='d-flex p-0 mt-3'>
                        <Col sm={1} className='pr-0 pl-1'>
                          <img
                            src='https://media-exp1.licdn.com/dms/image/C560BAQHdAaarsO-eyA/company-logo_100_100/0/1595530301220?e=1631750400&v=beta&t=epCwObuNQ7fgzYahnWONi2D1ghbJkdq0i3EBX2oZiTE'
                            alt='logo'
                            className=' img-fluid '
                          />
                        </Col>
                        <Col
                          className='p-0 ml-4 '
                          style={{ borderBottom: '1px solid lightgrey' }}
                        >
                          <Link to=''>
                            <div className='d-flex flex-row p-0 m-0 justify-content-between'>
                              <h6 className='m-0 p-0 text-dark'>Apple</h6>
                            </div>
                            <p className='text-muted m-0'>apple</p>
                            <p className='light-text  m-0'>apple</p>
                            <p className='light-text  m-0'>apple</p>
                          </Link>
                          <p className='mt-1'>apple</p>
                        </Col>
                      </Col>
                    </div>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          </Col>

          <Col lg={4} className='pt-5 d-flex flex-column d-md-none d-lg-block'>
            <div
              className='p-3'
              style={{
                backgroundColor: 'white',
                border: 'solid 1px lightgrey',
                borderRadius: '10px',
              }}
            >
              <Row>
                <Col lg={9}>
                  <Link
                    to=''
                    style={{
                      fontSize: '1em',
                      color: 'rgb(102,102,102)',
                      fontWeight: '600',
                    }}
                  >
                    Edit public profile & URL
                  </Link>
                </Col>
                <Col lg={2}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='d-inline-block mercado-match '
                    viewBox='0 0 16 16'
                    data-supported-dps='16x16'
                    fill='currentColor'
                    width='16'
                    height='16'
                    focusable='false'
                  >
                    <path d='M8 1a7 7 0 107 7 7 7 0 00-7-7zm0 11.25A1.25 1.25 0 119.25 11 1.25 1.25 0 018 12.25zM8.82 9H7v-.95l.93-.46C8.64 7.24 9 6.89 9 6.6S8.57 6 8 6a6.49 6.49 0 00-3 .91V4.84A6.35 6.35 0 018.1 4c2 0 2.9 1 2.9 2.4 0 .9-.5 1.83-2.18 2.6z'></path>
                  </svg>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col lg={9}>
                  <Link
                    to=''
                    style={{
                      fontSize: '1em',
                      color: 'rgb(102,102,102)',
                      fontWeight: '600',
                    }}
                  >
                    Add profile in another language{' '}
                  </Link>
                </Col>
                <Col lg={2}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='d-inline-block mercado-match'
                    viewBox='0 0 16 16'
                    data-supported-dps='16x16'
                    fill='currentColor'
                    width='16'
                    height='16'
                    focusable='false'
                  >
                    <path d='M8 1a7 7 0 107 7 7 7 0 00-7-7zm0 11.25A1.25 1.25 0 119.25 11 1.25 1.25 0 018 12.25zM8.82 9H7v-.95l.93-.46C8.64 7.24 9 6.89 9 6.6S8.57 6 8 6a6.49 6.49 0 00-3 .91V4.84A6.35 6.35 0 018.1 4c2 0 2.9 1 2.9 2.4 0 .9-.5 1.83-2.18 2.6z'></path>
                  </svg>
                </Col>
              </Row>
            </div>
            <div className='people_also_viewed'>
              <p style={{ fontSize: '1.5em', fontWeight: '500' }}>
                People also viewed
              </p>
              {people.slice(3, 10).map((p) => (
                <div className='profils_container' key={p._id}>
                  <img src={p.image} alt={p.name + ' ' + p.surname} />
                  <div className='profile_info'>
                    <Link to={'/profile/' + p.name + '/' + p._id}>
                      <div className='name'>{p.name + ' ' + p.surname}</div>
                      <div
                        className='speciality text-muted'
                        style={{ fontSize: '0.8em' }}
                      >
                        {p.title}
                      </div>
                    </Link>
                    <button className='connect_button px-2 py-0 mt-1'>
                      Connect
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Learning />
          </Col>
        </Row>
        <Messaging />
      </Container>
    </div>
  );
};

export default People;
