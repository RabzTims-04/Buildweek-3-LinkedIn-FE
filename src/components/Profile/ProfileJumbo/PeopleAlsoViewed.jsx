import React, { useEffect, useState } from 'react';
import './PeopleAlsoViewed.css';
import { Link } from 'react-router-dom';
const {REACT_APP_BACKEND_URL} = process.env;
const PeopleAlsoViewed = () => {
  const [Profiles, setProfiles] = useState([]);
  //console.log(Profiles);
  useEffect(() => {
    fetch(`${REACT_APP_BACKEND_URL}/profile/`)
      .then((response) => response.json())
      .then((data) => setProfiles(data));
  }, []);
  return (
    <div className='people_also_viewed'>
      <p style={{ fontSize: '1.5em', fontWeight: '500' }}>People also viewed</p>
      {Profiles.map((p) => (
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
            <button className='connect_button px-2 py-0 mt-1'>Connect</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PeopleAlsoViewed;
