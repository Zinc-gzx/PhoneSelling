import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import SignInButtons from './SignInButtons';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchBar from './SearchBar';


import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
  return (
    <Navbar className='NavBar'>
      <Container>
        <Row>
        <SearchBar />
        </Row>
        <Row>
          <Col>
          <Button variant="secondary">Checkout</Button>
          <SignInButtons />
          </Col>   
        </Row>
      </Container>
    </Navbar>
  );
};

export default NavBar;