import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Header from "./header";
import Shifts from "../shifts/shifts";

export default class Layout extends React.Component {
    render() {
        return (
            <Container fluid>
                <Header />
                <Row>
                    <Col><Shifts /></Col>
                </Row>
            </Container>
        )
    }
}