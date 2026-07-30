import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import { Container } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import BlogRollFilter from "../components/BlogRollFilter";
import Layout from "../components/Layout";
import {
  InlineContactCta,
  PracticeLinks,
  SplitHero,
} from "../components/PageElements";
import Seo from "../components/Seo";

const sectionId = (index) => `section-${index}`;

export const RechtPostTemplate = ({ data, picture, article, banner }) => (
  <>
    <SplitHero
      title={data.title}
      lead={data.lead}
      eyebrow="Rechtsgebiet"
      image={picture}
      imageAlt={data.title}
      compact
    >
      <Link className="btn btn-primary" to="/kontakt/">
        Fall schildern
      </Link>
    </SplitHero>

    <Container className="subpageContent">
      <div className="contentWithSidebar">
        <div>
          <header className="contentIntro">
            <h2 className="sectionEyebrow">Überblick</h2>
            <p className="sectionLead">{data.title} in Berlin</p>
            {banner?.[0]?.text ? <p>{banner[0].text}</p> : null}
          </header>

          {banner?.[1]?.text ? (
            <aside className="legalCallout">
              <span aria-hidden="true">§</span>
              <p>{banner[1].text}</p>
            </aside>
          ) : null}

          {article.map((item, index) => (
            <section
              className="richContent legalSection"
              id={sectionId(index)}
              key={`${item.title}-${index}`}
            >
              <h2>{item.title}</h2>
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={{ h4: "h3" }}
              >
                {item.body}
              </ReactMarkdown>
            </section>
          ))}

          <InlineContactCta
            title={`${data.title}: persönliche Beratung`}
            text="Schildern Sie uns Ihren Fall. Wir melden uns umgehend zurück."
          />
        </div>

        <div className="sidebarStack">
          <aside className="sidebarCard">
            <h2 className="sidebarTitle">Auf dieser Seite</h2>
            <nav className="sidebarNav" aria-label="Inhalt dieser Seite">
              <a href="#main-content">Überblick</a>
              {article.map((item, index) => (
                <a href={`#${sectionId(index)}`} key={`nav-${item.title}`}>
                  {item.title}
                </a>
              ))}
            </nav>
          </aside>
          <PracticeLinks current={data.title} />
        </div>
      </div>
    </Container>

    <section className="relatedSection">
      <Container>
        <BlogRollFilter recht={data.title} />
      </Container>
    </section>
  </>
);

RechtPostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  picture: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  banner: PropTypes.array,
  article: PropTypes.array.isRequired,
};

const RechtPost = ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <Layout>
      <RechtPostTemplate
        data={post.frontmatter}
        picture={post.frontmatter.picture}
        banner={post.frontmatter.banner}
        article={post.frontmatter.article}
      />
    </Layout>
  );
};

RechtPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default RechtPost;

export const Head = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;
  return (
    <Seo
      title={`${frontmatter.title} in Berlin`}
      description={frontmatter.lead}
      pathname={location.pathname}
      image={frontmatter.picture.publicURL}
    />
  );
};

export const pageQuery = graphql`
  query RechtPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        lead
        picture {
          publicURL
          childImageSharp {
            gatsbyImageData(
              width: 1200
              quality: 82
              layout: CONSTRAINED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
        banner {
          title
          text
        }
        article {
          title
          body
        }
      }
    }
  }
`;
