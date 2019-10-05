import './App.css';
import React from 'react';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col, Form, Button, Table, Image, Alert } from 'react-bootstrap';

import { getArtistSongs } from './api';

const styleButton = {
  backgroundColor: '#5cb85c', 
  borderColor: '#5cb85c'
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      author: 'Salmo', 
      error: false,
      result: [],
      find: true
    };
    this.handleForm = this.handleForm.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  updateValue = (e) => {
    this.setState({ author: e.target.value});
  }

  componentDidMount() {
    document.title = this.state.author;
    getArtistSongs(this, this.state.author);
  }

  handleForm = (e) => {
    e.preventDefault();
    if ( this.state.author !== '' && this.state.author !== 'undefined' ) {
      this.setState({error: false});
      document.title = this.state.author;
      
      getArtistSongs(this, this.state.author);
    }
    else this.setState({error: true, result: []});
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
              </Alert> : this.state.result.length === 0 ? 
              <Alert variant='danger' className='M-t-20'>
                Ooops! Author not found
              </Alert>
              : null
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

          <Table responsive className='Spacing'>
            <thead>
              <tr>
                <th>#</th>
                <th>Album name</th>
                <th>Song name</th>
                <th>Cover</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.find ? 
                this.state.result.map((item, key) => {
                  return (
                    <tr key={key}>
                      <td className='align-middle'>{key + 1}</td>
                      <td className='align-middle'>{item.collectionName}</td>
                      <td className='align-middle'>{item.trackName}</td>
                      <td className='align-middle'>
                        <Image src={item.artworkUrl100 === '' ? 'default.jpg' : item.artworkUrl100} />
                      </td>
                    </tr>
                  )
                })
                : null
              }
            </tbody>
          </Table>
        </Row>        
      </Container>
    );
  }
}
