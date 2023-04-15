import React from 'react'
import {Navbar, Container, Nav} from 'react-bootstrap';

const Navbarcomponent = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Banking system</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/adduser">AddUser</Nav.Link>
            <Nav.Link href="/viewuser">ViewUsers</Nav.Link>
            <Nav.Link href="/history">TransactionHistory</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
   
    </>
  )
}

export default Navbarcomponent;