import React, { useState, useEffect } from 'react';
import ApiManager from '../../modules/ApiManager';
import MessageCard from './MessageCard';
import MessageForm from './MessageForm'
import './Messages.css'

/* 
TODO: Given an active user sees a chat message from another user
And wants to make that user a friend
When the active user clicks on the other user's name in the chat history
Then a message should be presented to the active user asking for verification of adding the other user to their friend list
*/

const MessageList = props => {
  const [messages, setMessages] = useState([]);
  const [messageToEdit, setMessageToEdit] = useState({text: "", userId: 0, timestamp: ""});
  const [followingList, setFollowingList] = useState([]);
  const activeUser = JSON.parse(sessionStorage.getItem('credentials'));

  const getMessages = () => {
    return ApiManager.getAllWithExpand("messages", "user")
      .then(setMessages);
  }

  const getFollowingList = () => {
    // Gets the activeUser's followings and puts them in state
    return ApiManager.getAllWithUserId("followings", parseInt(activeUser.id))
      .then(setFollowingList)
  }

  const amFollowing = (user) => {
    if (followingList.find(({followedId}) => followedId === user.id)) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    getMessages();
    getFollowingList();
  }, [])

  return (
    <>
      <div className="wrapper">
        <div className="FixedHeightContainer">
          <div id="headerContainer">
            <h1>Chat</h1>
          </div>
          <div className="ScrollToBottom">
            <div className="container-cards">
              {/* Sorting by date via: 
              https://stackoverflow.com/questions/10123953/how-to-sort-an-array-by-a-date-property*/}
              {messages.sort(function(a,b){
                return new Date(a.timestamp) - new Date(b.timestamp)
              }).map(message => 
                <MessageCard 
                  key={message.id} 
                  message={message}
                  setMessageToEdit={setMessageToEdit}
                  amFollowing={amFollowing(message.user)}
                />
              )}
            </div>
          </div>
            <div className="container-form">
                <MessageForm
                  getMessages={getMessages}
                  messageToEdit={messageToEdit}
                  setMessageToEdit={setMessageToEdit}
                  {...props}
                />
            </div>
        </div>
      </div>
    </>
  )

}

export default MessageList