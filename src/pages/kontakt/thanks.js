import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../../components/Layout";

// eslint-disable-next-line
export default () => (
  <Layout>
    <div style={{background: "#f0f3f9", padding: "10rem 0rem", marginTop: "73px"}}>
      <Container>
        <Row>
          <Col>
            <h1 style={{margin: 0, marginTop: 5}}>Nachricht gesendet</h1>  
            <p>Vielen Dank für Ihre Nachricht. Wir werden uns so schnell wie möglich mit Ihnen in Verbindung setzen. Bei dringenden Anliegen sind wir telefonisch zu erreichen.</p>  
          </Col>
        </Row>
      </Container>
    </div>
  </Layout>
);
