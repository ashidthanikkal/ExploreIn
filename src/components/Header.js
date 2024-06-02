import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './Header'

function Header() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" style={{position:'fixed',top:'0',width:'100%',zIndex:'10'}}>
        <Container>
          <Link to={'/'} style={{textDecoration:'none'}}><Navbar.Brand href="#home"><b>ExploreIn</b></Navbar.Brand></Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"  style={{ outline:"none",boxShadow: "none", border: "none"}}/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Nav>
            <Nav.Link> <Link to={'/home'} style={{textDecoration:"none", color:"black"}}><h6>Home</h6></Link> </Nav.Link>
            <Nav.Link> <Link to={'/about'} style={{textDecoration:"none", color:"black"}}><h6>About</h6></Link> </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
