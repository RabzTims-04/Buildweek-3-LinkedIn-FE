import React from 'react';
import './Learning.css';
const {REACT_APP_BACKEND_URL} = process.env;
const Learning = () => {
  return (
    <div className='learning'>
      <div className='learning_title'>
        <img
          src='https://image.flaticon.com/icons/png/512/174/174857.png'
          alt='logo'
        />
        <div>Learning</div>
      </div>
      <div className='add_skills pt-4'>
        Add new skills with these courses, free for 24 hours
      </div>
      <div className='videos_container'>
        <div className='video pt-3'>
          <img
            src='https://www.theparticipanteffect.com/sites/default/files/users/nikolasadams/WP_Diversify.png'
            alt=''
          />
        </div>
        <div className='video_info'>
          <div className='video_title'>Diversify</div>
          <div className='video_views'>555,775 viewers</div>
        </div>
      </div>
      <div className='videos_container'>
        <div className='video pt-3'>
          <img
            src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
            alt=''
          />
        </div>
        <div className='video_info pt-0'>
          <div className='video_title'>
            Confident
          </div>
          <div className='video_views'>416,240 viewers</div>
        </div>
      </div>
      <div className='videos_container'>
        <div className='video pt-3'>
          <img
            src='https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg?fit=fill&w=480&h=270'
            alt=''
          />
        </div>
        <div className='video_info'>
          <div className='video_title'>Agile Foundations</div>
          <div className='video_views'>555,775 viewers</div>
        </div>
      </div>
      <div className='show_more'>Show more on LinkedIn Learning</div>
    </div>
  );
};

export default Learning;
