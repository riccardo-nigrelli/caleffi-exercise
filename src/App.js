import './App.css';
import React from 'react';
import { get } from 'axios';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col, Form, Button, Alert, Table, Image } from 'react-bootstrap';

// import { getArtistSongs } from './api';

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
    
    let query = this.state.author.trim().toLowerCase().split(/\s+/).join('+');
    console.log(query);
    get(`https://itunes.apple.com/search?term=${query}&entity=song&limit=50`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    })
    .then((response) => {
      const result = response.data.results;
      console.log(result);
      this.setState({ result });
    })
    .catch((err) => {
      alert(err);
    })
  }

  handleForm = (e) => {
    e.preventDefault();
    if ( this.state.author !== '' && this.state.author !== 'undefined' ) {
      this.setState({error: false});
      document.title = this.state.author;

      let query = this.state.author.trim().toLowerCase().split(/\s+/).join('+');
      console.log(query);
      get(`https://itunes.apple.com/search?term=${query}&entity=song&limit=50`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        }
      })
      .then((response) => {
        const result = response.data.results;
        console.log(result);
        this.setState({ result });
      })
      .catch((err) => {
        alert(err);
      })
    }
    else this.setState({error: true});
  }

  render() {
    return (
      <Container className='App Spacing'>
        <h1>iTunes song list</h1>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
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
                <th>Image</th>
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
                        <Image src={item.artworkUrl100} />
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
