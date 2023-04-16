import { Outlet, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
// import {
//   NavLink,
//   Bars,
//   NavMenu,
//   NavBtn,
//   NavBtnLink,
//   } from './NavbarElements';
import Container from 'react-bootstrap/Container';
import './Home.css';

const SignUpNav = () => {
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
      <Nav.Link href="/user">Oops I meant to select Sign In!</Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
  </Navbar>
  <Outlet />
    </>
  );
  };

export default SignUpNav;
