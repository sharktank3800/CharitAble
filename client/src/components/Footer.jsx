import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-primary text-light fixed-bottom py-3">
      <Container>
        <Row className="d-flex justify-content-between align-items-center">
          <Col md={6} className="text-center text-md-left mr-3">
            {/* Logo */}
            <img
              src="./logo_gagogo.svg"
              alt="Logo"
              height="40"
              className="d-inline-block align-top"
            />
          </Col>
          <Col md={6} className="text-center text-md-right">
            {/* Copyright text */}
            <p className="mb-0">&copy; 2023 CharitAble. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
