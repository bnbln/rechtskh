import * as React from "react";
import { Container, Button, Row, Col, Card, Carousel } from "react-bootstrap";


import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <Container>
        <h1>Aktuelles</h1>
        <BlogRoll all={true} />
      </Container>
      </Layout>
    );
  }
}
