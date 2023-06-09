import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

const Contact = ({ recipient, setRecipient, sender, setSender }) => {
  const [recipients, setRecipients] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  // autocomplete input data fetching
  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users?'
        );
        setRecipients(response.data);
      } catch (error) {
        return;
      }
    };
    fetchRecipients();
  }, []);

  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = recipients.filter((user) => {
        return user.username.toLowerCase().includes(text.toLowerCase());
      });
    }
    setRecipient(text);
    setSuggestions(matches);
  };

  const onSuggestHandler = (text) => {
    setRecipient(text);
    setSuggestions([]);
  };

  // sending data to backend
  const registerMessage = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'https://messages-app-backend.vercel.app/api/registerMessage',
        {
          sender: sender,
          recipient: recipient,
          title: title,
          message: message,
        }
      );
      toast.success('Message sent successfully');
    } catch (error) {
      toast.error('Failed sending message');
    }
    setSender('');
    setTitle('');
    setMessage('');
    setRecipient('');
  };

  return (
    <Form onSubmit={registerMessage} className='contact-form'>
      <Form.Group className='mb-3 input' controlId='formTitle'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter your name'
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className='mb-3 input' controlId='formTitle'>
        <Form.Label>Message title</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className='mb-3 input' controlId='formRecipient'>
        <Form.Label>Recipient</Form.Label>
        <Form.Control
          type='text'
          placeholder="Enter recipient's name"
          value={recipient}
          onChange={(e) => onChangeHandler(e.target.value)}
          required
        />
        {suggestions &&
          suggestions.map((suggestion, i) => (
            <div
              className='suggestion'
              key={i}
              onClick={() => onSuggestHandler(suggestion.username)}
            >
              {suggestion.username}
            </div>
          ))}
      </Form.Group>
      <Form.Group className='mb-3 input' controlId='formMessage'>
        <Form.Label>Message</Form.Label>
        <Form.Control
          as='textarea'
          rows={3}
          placeholder='Enter message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant='primary' type='submit' className='btn'>
        Send
      </Button>
    </Form>
  );
};

export default Contact;
