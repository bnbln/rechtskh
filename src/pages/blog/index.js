import * as React from "react";
import { Container } from "react-bootstrap";
import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";
import { SimplePageHeader } from "../../components/PageElements";
import Seo from "../../components/Seo";

const BlogIndexPage = () => (
  <Layout>
    <SimplePageHeader
      title="Aktuelles"
      eyebrow="Wissen & Einordnung"
      lead="Aktuelle Beiträge zu Mietrecht, Verkehrsrecht und Versicherungsrecht."
    />
    <section className="blogIndex">
      <Container>
        <BlogRoll all headingLevel={2} />
      </Container>
    </section>
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
