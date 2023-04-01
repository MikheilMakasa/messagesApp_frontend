import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Contact from './components/Contact';
import MessageList from './components/MessageList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [recipient, setRecipient] = useState('');
  return (
    <div className='lg messenger'>
      <ToastContainer
        theme='light'
        position='top-center'
        autoClose={2000}
        closeOnClick
        pauseOnHover={false}
      />
      <Contact recipient={recipient} setRecipient={setRecipient} />
      {recipient && (
        <div>
          <hr />
          <h4 className='msg'>Messages of {recipient}</h4>
          <hr />
        </div>
      )}
      {recipient && <MessageList recipient={recipient} />}
    </div>
  );
}

export default App;
