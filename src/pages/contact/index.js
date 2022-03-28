import * as React from "react";
import { navigate } from "gatsby-link";
import { Container, Button, Row, Col, Card, Carousel, Form } from "react-bootstrap";

import Layout from "../../components/Layout";



function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default class Index extends React.Component {
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
    return (
      <Layout>
        <Container>
          <Col lg={8}>
            <h1>Kontakt</h1>
          <Form
                name="contact"
                method="post"
                action="/contact/thanks/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.handleSubmit}
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
                  <Col xs={6}>
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
                  <Col xs={6}>
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
                  <Col xs={6}>
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
                  <Col xs={6}>
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
                  <Col xs={6}>
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
                  <Col xs={6}>
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
                    placeholder="Meine Nachricht" />
                </Form.Group>
                <Button type="submit">Senden</Button>
              </Form>
          </Col>
        </Container>
      </Layout>
    );
  }
}
