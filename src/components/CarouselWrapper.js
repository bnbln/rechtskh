import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import PreviewCompatibleImage from "./PreviewCompatibleImage";

// The first CMS image is the permanent homepage hero. Keeping the component
// preserves the CMS/API contract without introducing carousel motion.
export const CarouselWrapper = ({ images }) => {
  const slide = images[0];

  if (!slide) return null;

  return (
    <div className="heroStack">
      <div className="heroStackSlide isActive">
        <Link
          className="heroStackLink"
          to={slide.link}
          aria-label={`${slide.title} öffnen`}
        >
          <PreviewCompatibleImage
            imageInfo={{
              image: slide.image,
              alt: "",
              loading: "eager",
              fetchPriority: "high",
              sizes: "(max-width: 991px) 100vw, 670px",
              style: {
                width: "100%",
                height: "100%",
                objectPosition: "top center",
              },
            }}
          />
        </Link>
      </div>
    </div>
  );
};

CarouselWrapper.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.object.isRequired,
      link: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};
