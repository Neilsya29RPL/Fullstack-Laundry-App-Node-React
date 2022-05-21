import React from 'react';
import {Link} from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Button, Form, FormControl } from "react-bootstrap";

class HeaderKasir extends React.Component {
  Logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("admin")
    window.location = "../Login"
  }
  render() {
    return(
      <div>
        <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="#home">Laundry </Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/TransaksiOwner">GenerateLaporan</Nav.Link>
                <Nav.Link onClick={() => this.Logout()}>Logout</Nav.Link>
              </Nav>
              <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            </Container>
        </Navbar> 
        <br></br>
      </div>
    );
  }
}

export default HeaderKasir;
