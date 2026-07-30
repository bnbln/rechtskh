import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import { Col, Container, Row } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

import BlogRoll from "../components/BlogRoll";
import { CarouselWrapper } from "../components/CarouselWrapper";
import Layout from "../components/Layout";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import RechtRoll from "../components/RechtRoll";
import Seo from "../components/Seo";
import { MailIcon, MapPinIcon, PhoneIcon } from "../components/Icons";

const MAPS_URL =
  "https://www.google.com/maps/place/Rechtsanwalt+Tarik+Sharief/@52.50342,13.3411114,17z/data=!3m1!4b1!4m5!3m4!1s0x47a850547a59cbff:0x4097aa41c581420e!8m2!3d52.50342!4d13.3433001";

export const IndexPageTemplate = ({ hero, rechtsgebiete, kanzlei, settings }) => (
  <>
    {/* Hero — navy band, photo overhanging the lower edge, copy on a
        translucent panel that overlaps the photo. */}
    <section className="homeHero">
      <Container>
        <Row className="homeHeroRow">
          <Col lg={6} className="homeHeroMedia">
            <div className="homeHeroFrame">
              <CarouselWrapper images={hero.images} />
            </div>
          </Col>
          <Col lg={6} className="homeHeroContent">
            <p className="homeHeroEyebrow">
              <span className="homeHeroEyebrowDesktop">
                {settings.description} · Berlin
              </span>
              <span className="homeHeroEyebrowMobile">
                {hero.images[0].title}
              </span>
            </p>
            <h1>{hero.title}</h1>
            <p className="lead">{hero.lead}</p>
            <Link className="btn btn-primary" to={hero.cta.link}>
              {hero.cta.text}
            </Link>
          </Col>
        </Row>
      </Container>
    </section>

    {/* Schwerpunkte — staggered practice-area tiles. */}
    <section className="rkSection" aria-labelledby="practice-areas-title">
      <Container>
        <div className="sectionHead">
          <div>
            <h2 className="sectionEyebrow" id="practice-areas-title">
              Schwerpunkte
            </h2>
            <p className="sectionLead sectionLead--narrow">
              {rechtsgebiete.lead}
            </p>
          </div>
          <Link className="linkUnderline" to="/recht/mietrecht/">
            Alle Rechtsgebiete ansehen →
          </Link>
        </div>
        <RechtRoll order={rechtsgebiete.category} />
      </Container>
    </section>

    {/* Standort — split card with copy and a clickable map. */}
    <section className="locationSection" aria-labelledby="location-title">
      <Container>
        <div className="locationSplit">
          <div className="locationContent">
            <h2 className="sectionEyebrow">Standort</h2>
            <p className="sectionLead" id="location-title">
              {settings.description}
            </p>
            <ReactMarkdown>{settings.contact.info}</ReactMarkdown>
            <div className="locationDetails">
              <ReactMarkdown>{settings.contact.contact}</ReactMarkdown>
            </div>
            <a
              className="btn btn-outline-navy btn-sm"
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
            >
              In Google Maps öffnen →
            </a>
          </div>
          <a
            className="locationMapLink"
            href={MAPS_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Kanzleistandort in Google Maps öffnen"
          >
            <PreviewCompatibleImage
              imageInfo={{
                image: settings.contact.map,
                alt: "Karte mit dem Kanzleistandort am Wittenbergplatz",
                loading: "lazy",
                sizes: "(max-width: 991px) 100vw, 50vw",
              }}
            />
            <span className="locationMapScrim" aria-hidden="true" />
            <span className="locationMapChip">
              <MapPinIcon size={14} />
              Wittenbergplatz, Berlin
            </span>
          </a>
        </div>
      </Container>
    </section>

    {/* Kontakt-Banner — navy band with the direct contact routes. */}
    <section className="contactBanner" aria-labelledby="contact-cta-title">
      <Container>
        <Row className="align-items-center gy-4">
          <Col lg={7}>
            <h2 id="contact-cta-title">Jetzt Kontakt aufnehmen</h2>
            <p className="contactBannerLead">
              Persönliche Rechtsberatung für Ihr Anliegen — wir melden uns
              umgehend zurück.
            </p>
          </Col>
          <Col lg={5}>
            <div className="contactBannerDetails">
              <span className="contactBannerItem">
                <PhoneIcon />
                <a href="tel:+493069533361">030 – 69 53 33 61</a>
              </span>
              <span className="contactBannerItem">
                <MailIcon />
                <a href="mailto:kanzlei@rechtsklarheit.de">
                  kanzlei@rechtsklarheit.de
                </a>
              </span>
              <Link className="btn btn-primary" to="/kontakt/">
                Zum Kontaktformular
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>

    {/* Warum die Kanzlei — portrait next to a numbered reason list. */}
    {kanzlei?.reasons?.length ? (
      <section
        className="rkSection rkSection--tint"
        aria-labelledby="why-title"
      >
        <Container>
          <Row className="whyGrid gy-4">
            <Col lg={5}>
              <div className="whyMedia">
                <PreviewCompatibleImage
                  imageInfo={{
                    image: kanzlei.image,
                    alt: kanzlei.imagealt || "",
                    loading: "lazy",
                    sizes: "(max-width: 991px) 100vw, 40vw",
                    style: { objectPosition: "center 30%" },
                  }}
                />
              </div>
            </Col>
            <Col lg={7}>
              <h2 className="sectionEyebrow" id="why-title">
                Warum die Kanzlei
              </h2>
              <p className="sectionLead sectionLead--narrow">{kanzlei.lead}</p>
              <div className="whyList">
                {kanzlei.reasons.map((reason, index) => (
                  <div className="whyItem" key={`why-${reason.title}`}>
                    <span className="whyItemNumber" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="whyItemTitle">{reason.title}</p>
                      <p className="whyItemText">{reason.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link className="btn btn-navy" to="/kontakt/">
                {kanzlei.cta || "Termin anfragen"}
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    ) : null}

    {/* Aktuelles — three latest articles. */}
    <section className="rkSection" aria-labelledby="latest-title">
      <Container>
        <div className="sectionHead">
          <div>
            <h2 className="sectionEyebrow" id="latest-title">
              Aktuelles
            </h2>
            <p className="sectionLead">Aus der Kanzlei und dem Rechtsalltag</p>
          </div>
          <Link className="linkUnderline" to="/blog/">
            Alle Artikel ansehen →
          </Link>
        </div>
        <BlogRoll all={false} headingLevel={3} />
      </Container>
    </section>
  </>
);

IndexPageTemplate.propTypes = {
  hero: PropTypes.object,
  rechtsgebiete: PropTypes.object,
  kanzlei: PropTypes.object,
  settings: PropTypes.object,
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  return (
    <Layout isHome>
      <IndexPageTemplate
        hero={frontmatter.hero}
        rechtsgebiete={frontmatter.rechtsgebiete}
        kanzlei={frontmatter.kanzlei}
        settings={frontmatter.settings}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const Head = ({ data, location }) => {
  const { hero, settings } = data.markdownRemark.frontmatter;
  return (
    <Seo
      title={settings.site}
      description={`${hero.lead}. ${hero.title}.`}
      pathname={location.pathname}
      image={settings.image.publicURL}
    />
  );
};

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        hero {
          images {
            title
            image {
              childImageSharp {
                gatsbyImageData(
                  width: 1280
                  quality: 65
                  layout: CONSTRAINED
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
            link
          }
          title
          lead
          cta {
            text
            link
          }
        }
        rechtsgebiete {
          lead
          category
        }
        kanzlei {
          lead
          cta
          imagealt
          image {
            childImageSharp {
              gatsbyImageData(
                width: 720
                quality: 70
                layout: CONSTRAINED
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
          reasons {
            title
            text
          }
        }
        settings {
          site
          seo
          description
          image {
            publicURL
          }
          contact {
            map {
              childImageSharp {
                gatsbyImageData(
                  width: 1280
                  quality: 70
                  layout: CONSTRAINED
                  placeholder: BLURRED
                )
              }
            }
            info
            contact
            open
            image {
              childImageSharp {
                gatsbyImageData(width: 720, quality: 70, layout: CONSTRAINED)
              }
            }
            bu
          }
        }
      }
    }
  }
`;
