import React, { useState } from 'react';
import logo from './logo.svg';
import { Container, Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import TaskList from './components/tasks/TaskList';
// import './App.css';





const App = () => {
  return (
    <>
      <Container>
        <h1 className="header">Welcome To React-Bootstrap</h1>
        <Navbar bg="dark" variant='dark' expand="lg">
          <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <TaskList></TaskList>
      </Container>

    </>
  );

}


export default App;
