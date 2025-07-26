import { useState } from 'react'
import Sidebar from './components/Sidebar'; "./components/Sidebar";
import ChatWindow from './components/ChatWindow';
import Chat from './components/Chat';
import {ContextProvider} from './context/Context';

import './App.css'


function App() {
  return (
    <div className='d-flex '>
      <ContextProvider>
        <Sidebar/>
        <ChatWindow/>
      </ContextProvider>
    </div>
  )
}

export default App
