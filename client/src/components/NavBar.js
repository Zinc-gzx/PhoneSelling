import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import SignInButtons from './SignInButtons';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'phosphor-react';


import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
  return (
    <Navbar className='NavBar'>
      <Container>
      <Row>
        <Link to="/"><SearchBar /></Link>
        </Row>
        <Row>
          <Col>
          <SignInButtons />
          <Link to = "/checkout"><Button variant="secondary">Checkout</Button></Link>
          <Link to = "/checkout"> <ShoppingCart size={32}/></Link>
          </Col>   
        </Row>
      </Container>
    </Navbar>
  );
};

export default NavBar;