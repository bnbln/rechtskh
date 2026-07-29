import * as React from "react";
import PropTypes from "prop-types";

export const remapHeadings = (content, headingMap = {}) =>
  Object.entries(headingMap).reduce(
    (html, [from, to]) =>
      html.replace(new RegExp(`(<\\/?h)${from}(?=[\\s>])`, "gi"), `$1${to}`),
    content
  );

export const HTMLContent = ({ content, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
);

const Content = ({ content, className }) => (
  <div className={className}>{content}</div>
);

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
};

HTMLContent.propTypes = Content.propTypes;

export default Content;
