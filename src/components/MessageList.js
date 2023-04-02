import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';

const MessageList = ({ sender }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `https://messages-app-backend.vercel.app/api/messages/${sender}`
        );

        setMessages(response.data.result);
      } catch (error) {
        toast.error('Error fetching messages');
      }
    };

    if (sender) {
      fetchMessages();
    }
  }, [sender]);

  return (
    <div className='messageList'>
      {messages.length > 0 ? (
        <Table striped bordered hover className='table' size='md'>
          <thead>
            <tr>
              <th>Sender</th>
              <th>Title</th>
              <th>Message</th>
              <th>Received at</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message, index) => (
              <tr key={index}>
                <td>{message.sender}</td>
                <td>{message.title}</td>
                <td>{message.message}</td>
                <td>
                  {moment(message.created_at).format('HH:mm:ss, DD.MM.YYYY')}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className='msg'>
          <h5>no messages to display...</h5>
        </div>
      )}
    </div>
  );
};

export default MessageList;
