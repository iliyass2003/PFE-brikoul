import React from 'react'
import Chat from '../components/Chat'
import Sidebar from '../components/Sidebar'

const ChatHome = () => {
  return (
    <div className='chathome'>
      <div className='container'>
      <Sidebar/>
      <Chat/>
      </div>
    </div>
  )
}

export default ChatHome