import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Contact from './components/Contact';
import MessageList from './components/MessageList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [recipient, setRecipient] = useState('');
  const [sender, setSender] = useState('');
  return (
    <div className='lg messenger'>
      <ToastContainer
        theme='light'
        position='top-center'
        autoClose={2000}
        closeOnClick
        pauseOnHover={false}
      />
      <Contact
        recipient={recipient}
        setRecipient={setRecipient}
        sender={sender}
        setSender={setSender}
      />

      <div className={`title ${sender && 'show'}`}>
        <hr />
        <h4 className='msg'>Messages of {sender}</h4>
        <hr />
      </div>

      {sender && <MessageList sender={sender} />}
    </div>
  );
}

export default App;
