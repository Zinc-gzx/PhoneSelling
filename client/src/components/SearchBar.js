import React, { useState } from 'react';
import {Navbar, Container, Row, Col, FormControl, Button, InputGroup } from 'react-bootstrap';

const SearchBar = () => {

  return (
    <Navbar expand="sm" variant="light" bg="light">
      <Container>
        <Row className="justify-content-md-center">
            <Col md={{ span: 25, offset: 1 }}>
            <InputGroup className="mb-3">
            <FormControl
            placeholder="Search phones..."
            value={searchText}
            />
            <Button variant="secondary" onClick={handleSearch}>Search</Button>
            </InputGroup>
            </Col>
        </Row>
      </Container>
    </Navbar>
    
  );
};

export default SearchBar;
