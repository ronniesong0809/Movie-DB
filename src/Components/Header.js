import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import "./stylesheet.css";

const Header = () => {
  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">
          <img alt="logo" src="/images/movie.svg" width="40" height="40" className="svgShadow d-inline-block align-baseline" />
          <span className="title textShadow">MovieDB</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="https://www.themoviedb.org" rel="noopener noreferrer" target="_blank">
              <img alt="source" src="/images/tmdb.svg" width="70" className="svgShadow d-inline-block align-top" />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;