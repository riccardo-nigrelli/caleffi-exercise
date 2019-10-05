import './App.css';
import React from 'react';
// import { get } from 'axios';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col, Form, Button, Alert, } from 'react-bootstrap'; // Table, Image 

import { getArtistSongs } from './tool';

const styleButton = {
  backgroundColor: '#5cb85c', 
  borderColor: '#5cb85c'
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      author: 'Post Malone', 
      error: false, 
      response: null 
    };
    this.handleForm = this.handleForm.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  updateValue = (e) => {
    this.setState({ author: e.target.value});
  }

  componentDidMount() {
    document.title = this.state.author;
    let query = this.state.author.trim().toLowerCase().split(/\s+/).join('+');
    getArtistSongs(query, (response) => {
      this.setState({response: response});

      console.log(this.state.response);
      console.log(this.state.response.length);
    });
  }

  handleForm = (e) => {
    e.preventDefault();
    if ( this.state.author !== '' && this.state.author !== 'undefined' ) {
      this.setState({error: false});
      document.title = this.state.author;

      let query = this.state.author.trim().toLowerCase().split(/\s+/).join('+');
      getArtistSongs(query, (response) => {
        this.setState({response: response});
        console.log(this.state.response);
        console.log(this.state.response.length);
      });
    }
    else this.setState({error: true});
  }

  render() {
    return (
      <Container className='App Spacing'>
        <h1>iTunes song list</h1>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
          {
            this.state.error ? 
            <Alert variant='danger' className='M-t-20'>
              Please enter the name of a singer
            </Alert> : null
          }

            <Form className='M-t-20' onSubmit={this.handleForm}>  
              <Form.Group controlId='authorName'>
                <Form.Control 
                  defaultValue={this.state.author}
                  deftype='text'
                  placeholder='Enter author name'
                  onChange={this.updateValue}
                />
              </Form.Group>
              <Button style={styleButton} type='submit'>
                <FontAwesomeIcon 
                  icon={faSearch} 
                  className='M-r-10'
                />
                Search
              </Button>
            </Form>
          </Col>
        </Row>        
      </Container>
    );
  }
}
