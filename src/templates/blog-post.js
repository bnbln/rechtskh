import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import { Container } from "react-bootstrap";

import BlogRollFilter from "../components/BlogRollFilter";
import Content, { HTMLContent, remapHeadings } from "../components/Content";
import Layout from "../components/Layout";
import { Breadcrumbs, InlineContactCta } from "../components/PageElements";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import Seo from "../components/Seo";

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  recht,
  date,
  title,
  image,
  authorImage,
  data,
}) => {
  const PostContent = contentComponent || Content;
  const areaPath = recht ? `/recht/${recht.toLocaleLowerCase("de-DE")}/` : null;

  return (
    <>
      <header className="articleHeader">
        <Container className="articleHeaderInner">
          <Breadcrumbs
            dark
            items={[
              { label: "Aktuelles", to: "/blog/" },
              ...(recht ? [{ label: recht, to: areaPath }] : []),
            ]}
          />
          <div className="articleMeta">
            {recht ? <Link to={areaPath}>{recht}</Link> : <span>Aktuelles</span>}
            <span aria-hidden="true">•</span>
            <time>{date}</time>
          </div>
          <h1>{title}</h1>
          {description ? <p>{description}</p> : null}
        </Container>
      </header>

      <Container className="articleLayout">
        {image ? (
          <div className="articleMedia">
            <PreviewCompatibleImage
              imageInfo={{
                image,
                alt: title,
                loading: "eager",
                fetchPriority: "high",
                sizes: "(max-width: 991px) 100vw, 1280px",
                style: { width: "100%", height: "100%" },
              }}
            />
          </div>
        ) : null}
        <article className="articleMain">
          <PostContent className="richContent articleBody" content={content} />
          <InlineContactCta />
          <aside className="authorNote">
            {authorImage ? (
              <div className="authorPortrait">
              <PreviewCompatibleImage
                imageInfo={{
                  image: authorImage,
                  alt: "Rechtsanwalt Tarik Sharief",
                  loading: "lazy",
                  sizes: "88px",
                  style: { width: "100%", height: "100%" },
                }}
              />
            </div>
            ) : null}
            <div className="authorDetails">
              <p className="authorName">Rechtsanwalt Tarik Sharief</p>
              <p>Kanzlei am Wittenbergplatz, Berlin</p>
            </div>
            <Link to="/anwalt/">Zum Profil →</Link>
          </aside>
        </article>

        <aside className="sidebarStack articleSidebar">
          <div className="sidebarCard">
            <h2 className="sidebarTitle">Beratung</h2>
            <p>
              Sie haben Fragen zu diesem Thema? Schildern Sie uns Ihr Anliegen.
            </p>
            <Link className="btn btn-outline-navy btn-sm" to="/kontakt/">
              Kontakt aufnehmen
            </Link>
          </div>
          {recht ? (
            <div className="sidebarCard sidebarCard--tint">
              <h2 className="sidebarTitle">Thema</h2>
              <p>Weitere Informationen, Fälle und Hinweise aus diesem Bereich.</p>
              <Link className="linkUnderline linkUnderline--small" to={areaPath}>
                {recht} ansehen →
              </Link>
            </div>
          ) : null}
        </aside>
      </Container>

      {recht && data ? (
        <section className="relatedSection">
          <Container>
            <BlogRollFilter recht={recht} exclude={data.markdownRemark.id} />
          </Container>
        </section>
      ) : null}
    </>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
  image: PropTypes.object,
  authorImage: PropTypes.object,
  recht: PropTypes.string,
  date: PropTypes.string,
  data: PropTypes.object,
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <Layout>
      <BlogPostTemplate
        data={data}
        content={remapHeadings(post.html, { 3: 2 })}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        image={post.frontmatter.featuredimage}
        authorImage={data.about?.frontmatter?.featuredimage}
        title={post.frontmatter.title}
        recht={post.frontmatter.recht}
        date={post.frontmatter.date}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({ markdownRemark: PropTypes.object }),
};

export default BlogPost;

export const Head = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;
  return (
    <Seo
      title={frontmatter.title}
      description={frontmatter.description}
      pathname={location.pathname}
      image={frontmatter.featuredimage.publicURL}
      type="article"
      datePublished={frontmatter.datePublished}
    />
  );
};

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    about: markdownRemark(frontmatter: { templateKey: { eq: "anwalt-page" } }) {
      frontmatter {
        featuredimage {
          childImageSharp {
            gatsbyImageData(
              width: 240
              quality: 78
              layout: CONSTRAINED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "DD.MM.YYYY")
        datePublished: date
        title
        description
        recht
        featuredimage {
          publicURL
          extension
          childImageSharp {
            gatsbyImageData(
              width: 1000
              quality: 78
              layout: CONSTRAINED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  }
`;
