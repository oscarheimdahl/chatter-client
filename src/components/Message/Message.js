import React from 'react';
import '../../style/message.css';

const Message = props => {
  return (
    <div className="message-wrapper">
      <div
        className={`message-body ${
          props.message.own ? 'message-own' : 'message-other'
        }`}
      >
        {props.message.hideName ? (
          ''
        ) : (
          <p className="message-username">{props.message.username}</p>
        )}
        <div className={`message-content`}>
          <span>{props.message.content}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
