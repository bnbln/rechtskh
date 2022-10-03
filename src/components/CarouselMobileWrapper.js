import React from "react";
import { navigate } from "gatsby";
import { Carousel } from "react-bootstrap";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

export const CarouselMobileWrapper = ({ images }) => {
  return (
    <>
      <Carousel
        className="d-flex d-lg-none"
        style={{
          marginBottom: "1rem",
        }}
      >

        <Carousel.Item onClick={() => navigate(images[0].link)} style={{
            position: "relative",
            width: "100%",
            height: "100%"
            }}>
          <PreviewCompatibleImage
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              left: 0,
              top: 0
            }}
            imageInfo={{
              image: images[0].image,
              alt: images[0].title,
              style: { borderRadius: "0px", maxWidth: "none", height: "100%" },
            }}
            className="d-block w-100"
          />
          <Carousel.Caption>
            <h1>{images[0].title}</h1>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item onClick={() => navigate(images[1].link)} style={{
            position: "relative",
            width: "100%",
            height: "100%"
            }}>
          <PreviewCompatibleImage
            style={{
              height: "100%",
            }}
            imageInfo={{
              image: images[1].image,
              alt: images[1].title,
              style: { borderRadius: "0px", maxWidth: "none", height: "100%" },
            }}
            className="d-block w-100"
          />
          <Carousel.Caption>
            <h1>{images[1].title}</h1>
          </Carousel.Caption>
        </Carousel.Item>

      </Carousel>
    </>
  );
};
