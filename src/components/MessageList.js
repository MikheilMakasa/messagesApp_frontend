import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';

const MessageList = ({ recipient }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `https://messages-app-backend.vercel.app/api/messages/${recipient}`
        );

        setMessages(response.data.result);
      } catch (error) {
        setError(error.response.data);
      }
    };

    if (recipient) {
      fetchMessages();
    }
  }, [recipient]);

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
