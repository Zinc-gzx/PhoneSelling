import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import SignInButtons from './SignInButtons';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
  return (
    <Navbar expand="sm" variant="light" bg="light">
      <Container>
        <Row>
          <Col>
          <Navbar.Brand href="#">OldPhoneDeals</Navbar.Brand>
          </Col>
          <Col xs>Second, but unordered</Col>
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