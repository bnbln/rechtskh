import * as React from "react";
import { Container, Row, Col } from "react-bootstrap";


import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div style={{background: "#f0f3f9", padding: "2rem 0rem", marginBottom: "2rem"}}>
      <Container>
        <Row>
          <Col>
            <h1 style={{margin: 0, marginTop: 5}}>Aktuelles</h1>    
          </Col>
        </Row>
      </Container>
     </div>
        <Container>
        <BlogRoll all={true} />
      </Container>
      </Layout>
    );
  }
}
