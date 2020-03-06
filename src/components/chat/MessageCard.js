import React from "react";
import "./Messages.css"

const MessageCard = props => {
  const username = props.message.user.username;
  const text = props.message.message;
  const timestamp = props.message.timestamp;
  const picUrl = props.message.user.picUrl;

  return (
    <div className="card">
      <div className="card-content, message-container">
        <img src={picUrl} alt="Avatar" />
        <p>
          <strong>{username}</strong>: {text} 
        </p>
        {/*TODO: Only show this if it is the active user*/}
        <button
          type="button"
          className="chat-edit-button"
          onClick={() => props.setMessageToEdit(props.message)}
        >
          Edit
        </button>
        <span className="time-right">{timestamp}</span>
      </div>
    </div>
  )
}

export default MessageCard