import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { Link } from 'react-router-dom'

const Message = ({message}) => {

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({behavior:"smooth"})
  }, [message])

  const formattedDate = message.date
    ? new Date(message.date.seconds * 1000).toLocaleString() // Assuming seconds property represents Unix timestamp
    : '';
  

  return (
    <div ref={ref}
    className={`message ${message.senderId === currentUser.uid && "owner"}`}>
        <div className="messageInfo">
            <img src={message.senderId === currentUser.uid
               ? currentUser.photoURL 
               : data.user.photoURL
              } 
              alt="" />
        
        </div>
        <div className="messageContent">
            <p>
              {message.text}
            </p>
            {message.img &&
            <Link to={message.img}>
              <img src={message.img}  alt="" />
            </Link>}
            <span>{formattedDate}</span>
        </div>
    </div>
  )
}

export default Message