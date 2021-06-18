import React from "react";
import {Button, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";

export default class Header extends React.Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#">Shifts App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search (not implemented)" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}