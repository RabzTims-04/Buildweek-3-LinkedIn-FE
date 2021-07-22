import React from 'react';
import './Chat.css';
import EllipsisText from 'react-ellipsis-text';

const Chat = ({ p }) => {
  return (
    <>
      <div className='chat'>
        <img className='message_img' src={p.image} alt='' />
        <div className='profile_info'>
          <div className='message_name'>{p.name}</div>
          <div className='message'>
            <EllipsisText text={p.bio} length={'25'} />
          </div>
        </div>
        <div className='date'>Today</div>
      </div>
      <hr />
    </>
  );
};

export default Chat;
