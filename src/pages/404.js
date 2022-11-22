import * as React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../components/Layout";

const NotFoundPage = () => (
  <Layout>
    <div style={{background: "#f0f3f9", padding: "10rem 0rem", marginTop: "73px"}}>
      <Container>
        <Row>
          <Col>
            <h1 style={{margin: 0, marginTop: 5}}>Diese Unterseite existiert nicht mehr.</h1>  
            <p>Sie haben eine Unterseite besucht, die nicht existiert.</p>  
          </Col>
        </Row>
      </Container>
    </div>
  </Layout>
);

export default NotFoundPage;
