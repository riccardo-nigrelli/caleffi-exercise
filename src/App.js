import React from 'react';
import './App.css';
// import FontAwesome from 'react-fontawesome'
import { Container, Form, Button } from 'react-bootstrap';

export default class App extends React.Component {

  render() {
    return (
      <Container className="App Spacing">
        <h1>iTunes song list of {this.state.inputValue} </h1>
        <Form className="Spacing">  
          <Form.Group controlId="authorName">
            <Form.Control 
              deftype="text" 
              placeholder="Enter author name"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Form>
      </Container>
    );
  }
}
