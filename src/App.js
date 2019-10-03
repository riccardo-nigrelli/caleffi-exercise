import React, { useState, useEffect } from 'react';
import './App.css';
// import FontAwesome from 'react-fontawesome'
import { Container, Form, Button } from 'react-bootstrap';


function App() {

  const [input, setInput] = useState('Post Malone');

  useEffect(() => {
    document.title = input;
  });

  return (
    <Container className='App Spacing'>
      <h1>iTunes song list of {input}</h1>
      <Form className='Spacing'>  
        <Form.Group controlId='authorName'>
          <Form.Control 
            defaultValue={input}
            deftype='text'
            placeholder='Enter author name'
            onInput={e => setInput(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Search
        </Button>
      </Form>
    </Container>
  );
}

export default App;
