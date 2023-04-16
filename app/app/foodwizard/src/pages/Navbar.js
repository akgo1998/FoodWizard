import { Outlet, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import './Home.css';

const SignInNav = () => {
  return (
    <>
   
  <Navbar sticky="top" bg="dark" expand="lg" variant="dark">
  <Container>
  <Navbar.Brand href="/">Food Wizard!</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="/">Home</Nav.Link>
    </Nav>
    <Nav>
      <Nav.Link href="/">Sign Out</Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
  </Navbar>
  <Outlet />
    </>
  );
  };

export default SignInNav;
