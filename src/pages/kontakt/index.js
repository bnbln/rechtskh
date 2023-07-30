import * as React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import { navigate } from "gatsby-link";
import { Container, Button, Row, Col, Form } from "react-bootstrap";

import PreviewCompatibleImage from '../../components/PreviewCompatibleImage'
import Layout from "../../components/Layout";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";



function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValidated: false };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch((error) => alert(error));
  };

  render() {
    const { props } = this.props;
    const { data } = this.props;
    console.log(data.markdownRemark.frontmatter.settings.contact);
    return (
      <Layout>
        <div style={{background: "#f0f3f9", padding: "2rem 0rem", marginBottom: "2rem",marginTop: "73px",}}>
          <Container>
            <Row>
              <Col>
                <h1 style={{margin: 0, marginTop: 5}}>Kontakt</h1>    
              </Col>
            </Row>
          </Container>
       </div>
        <Container>
        <Row>
          <Col lg={8}>
            <Form
                  name="contact"
                  method="post"
                  action="/kontakt/thanks/"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={this.handleSubmit}
                  style={{
                    marginBottom: "2rem"
                  }}
                >
                  {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                  <input type="hidden" name="form-name" value="contact" />
                  <div hidden>
                    <label>
                      Don’t fill this out:{' '}
                      <input name="bot-field" onChange={this.handleChange} />
                    </label>
                  </div>
                  <Row>
                    <Col sm={6}>
                    <Form.Group className="mb-3" controlId="vorname">
                      <Form.Label htmlFor={'vorname'}>Vorname</Form.Label>
                      <Form.Control  
                        type={'text'}
                        name={'vorname'}
                        onChange={this.handleChange}
                        id={'vorname'}
                        required={true}
                        placeholder="Max" />
                    </Form.Group>
                    </Col>
                    <Col sm={6}>
                    <Form.Group className="mb-3" controlId="nachname">
                      <Form.Label htmlFor={'nachname'}>Nachname</Form.Label>
                      <Form.Control 
                        type={'text'}
                        name={'nachname'}
                        onChange={this.handleChange}
                        id={'nachname'}
                        required={true}
                        placeholder="Mustermann" />
                    </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={6}>
                    <Form.Group className="mb-3" controlId="adresse">
                    <Form.Label htmlFor={'adresse'}>Straße und Hausnummer</Form.Label>
                    <Form.Control 
                      type={'text'}
                      name={'adresse'}
                      onChange={this.handleChange}
                      id={'adresse'}
                      required={true}
                      placeholder="Musterstraße 10" />
                  </Form.Group>
                    </Col>
                    <Col sm={6}>
                    <Form.Group className="mb-3" controlId="stadt">
                    <Form.Label htmlFor={'stadt'}>PLZ und Stadt</Form.Label>
                    <Form.Control 
                      type={'text'}
                      name={'stadt'}
                      onChange={this.handleChange}
                      id={'stadt'}
                      required={true}
                      placeholder="12161 Berlin" />
                  </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={6}>
                    <Form.Group className="mb-3" controlId="email">
                    <Form.Label htmlFor={'email'}>Mailadresse</Form.Label>
                    <Form.Control 
                      type={'email'}
                      name={'email'}
                      onChange={this.handleChange}
                      id={'email'}
                      required={true}
                      placeholder="max.mustermann@mail.de" />
                  </Form.Group>
                    </Col>
                    <Col sm={6}>
                    <Form.Group className="mb-3" controlId="telefon">
                    <Form.Label htmlFor={'telefon'}>Telefonnummer</Form.Label>
                    <Form.Control 
                      type={'text'}
                      name={'telefon'}
                      onChange={this.handleChange}
                      id={'telefon'}
                      required={true}
                      placeholder="030 1234567" />
                  </Form.Group>
                    </Col>
                    <Form.Group>
                    <Form.Check 
                      type="switch"
                      id="custom-switch"
                      label="ich wünsche einen Rückruf"
                      style={{marginBottom: 24}}
                    />
                    </Form.Group>
                  </Row>

                  <Form.Group className="mb-3" controlId="betreff">
                    <Form.Label htmlFor={'betreff'}>Betreff</Form.Label>
                    <Form.Control 
                      type={'text'}
                      name={'betreff'}
                      onChange={this.handleChange}
                      id={'betreff'}
                      required={true}
                      placeholder="Mein Anliegen" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="message">
                    <Form.Label htmlFor={'message'}>Nachricht</Form.Label>
                    <Form.Control 
                      as="textarea"
                      type={'textarea'}
                      name={'message'}
                      onChange={this.handleChange}
                      id={'message'}
                      required={true}
                      style={{ height: '200px' }}
                      placeholder="Meine Nachricht" />
                  </Form.Group>
                  <Button type="submit">Senden</Button>
            </Form>
          </Col>
          <Col lg={4}>
            <div style={{
              width: "100%",
              color: "white"
            }}>
              <div style={{
              padding: "1rem",
              background: "#172340",
            }}>
              <ReactMarkdown>{data.markdownRemark.frontmatter.settings.contact.intro}</ReactMarkdown>
              <PreviewCompatibleImage
                        className="card-img-top"
                        imageInfo={{
                          style: { width: "100%", padding: "50px",},
                          image: data.markdownRemark.frontmatter.settings.contact.image,
                        }}
                      />
              <div style={{
              padding: "1rem",
              color: "black"
            }}>
              </div>
             <ReactMarkdown>{data.markdownRemark.frontmatter.settings.contact.bu}</ReactMarkdown>
            </div>

            </div>
          </Col>
        </Row>
        </Container>
      </Layout>
    );
  }
}

export default function ContactSheet(props) {
  return (
    <StaticQuery
      query={graphql`
        query ContactSheetQuery {
          markdownRemark(frontmatter: {templateKey: {eq: "index-page"}}) {
            id
            frontmatter {
              settings {
                contact {
                  open
                  intro
                  info
                  contact
                  bu
                  image {
                    childImageSharp {
                      gatsbyImageData(width: 1920, quality: 100, layout: CONSTRAINED)
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={(data, count) => (
        <Index data={data} count={count} props={props} />
      )}
    />
  );
}