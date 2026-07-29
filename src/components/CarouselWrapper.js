import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import PreviewCompatibleImage from "./PreviewCompatibleImage";

const AUTOPLAY_DELAY = 6500;

export const CarouselWrapper = ({ images }) => {
  const slides = images.slice(0, 2);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () =>
      mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  React.useEffect(() => {
    if (paused || reducedMotion || slides.length < 2) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(intervalId);
  }, [paused, reducedMotion, slides.length]);

  return (
    <div
      className={`heroCarousel${reducedMotion ? " reduceMotion" : ""}`}
      role="region"
      aria-roledescription="Karussell"
      aria-label="Rechtsgebiete"
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, index) => {
        const isActive = activeSlide === index;

        return (
          <div
            className={`heroCarouselSlide${isActive ? " isActive" : ""}`}
            key={`${slide.title}-${index}`}
            onMouseEnter={() => {
              setActiveSlide(index);
              setPaused(true);
            }}
          >
            <Link
              className="heroCarouselLink"
              to={slide.link}
              aria-label={`${slide.title} öffnen`}
              onFocus={() => {
                setActiveSlide(index);
                setPaused(true);
              }}
              onBlur={() => setPaused(false)}
            >
              <span className="heroCarouselTitle">{slide.title}</span>
              <PreviewCompatibleImage
                imageInfo={{
                  image: slide.image,
                  alt: "",
                  loading: index === 0 ? "eager" : "lazy",
                  fetchPriority: index === 0 ? "high" : "auto",
                  sizes:
                    "(max-width: 767px) 100vw, (max-width: 991px) 50vw, 560px",
                  style: { width: "100%", height: "100%" },
                }}
              />
            </Link>
          </div>
        );
      })}
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
