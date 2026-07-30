import * as React from "react";
import PropTypes from "prop-types";
import { GatsbyImage } from "gatsby-plugin-image";

const PreviewCompatibleImage = ({ imageInfo }) => {
  const {
    alt = "",
    childImageSharp,
    image,
    style,
    className,
    loading,
    fetchPriority,
    sizes,
  } = imageInfo;

  if (!!image && !!image.childImageSharp) {
    return (
      <GatsbyImage
        image={image.childImageSharp.gatsbyImageData}
        style={{ objectPosition: "center", ...style }}
        alt={alt}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        sizes={sizes}
      />
    );
  } else if (!!childImageSharp) {
    return (
      <GatsbyImage
        image={childImageSharp.gatsbyImageData}
        style={{ objectPosition: "center", ...style }}
        alt={alt}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        sizes={sizes}
      />
    );
    // for Netlify CMS 
  } else if (image) {
    return (
      <img
        className={className}
        style={{ objectPosition: "center", ...style }}
        src={image}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
      />
    );
  } else {
    return null
  }
};

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    style: PropTypes.object,
    loading: PropTypes.oneOf(["eager", "lazy"]),
    fetchPriority: PropTypes.oneOf(["high", "low", "auto"]),
    sizes: PropTypes.string,
  }).isRequired,
};

export default PreviewCompatibleImage;
