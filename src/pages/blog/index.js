import * as React from "react";
import { Container, Row, Col } from "react-bootstrap";


import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";
import Seo from "../../components/Seo";

const BlogIndexPage = () => (
      <Layout>
        <div style={{background: "#f0f3f9", padding: "2rem 0rem", marginBottom: "2rem", marginTop: "73px",}}>
      <Container>
        <Row>
          <Col>
            <h1 style={{margin: 0, marginTop: 5}}>Aktuelles</h1>    
          </Col>
        </Row>
      </Container>
     </div>
        <Container>
        <BlogRoll all={true} headingLevel={2} />
      </Container>
      </Layout>
);

export default BlogIndexPage;

export const Head = ({ location }) => (
  <Seo
    title="Aktuelles"
    description="Aktuelle Beiträge zu Mietrecht, Verkehrsrecht und Versicherungsrecht von Rechtsanwalt Tarik Sharief in Berlin."
    pathname={location.pathname}
  />
);
