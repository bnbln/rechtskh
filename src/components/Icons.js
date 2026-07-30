import React from "react";
import PropTypes from "prop-types";

// Line icons from the redesign. Each one inherits `currentColor` and takes its
// size from the `size` prop so the tokens in tokens.scss stay in charge of
// colour. Keep the 24×24 viewBox and 1.8 stroke of the design.

const Svg = ({ size, strokeWidth, children, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    {children}
  </svg>
);

Svg.propTypes = {
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
  children: PropTypes.node,
};

const icon = (paths, defaultStroke = 1.8) => {
  const Icon = ({ size = 18, strokeWidth = defaultStroke, ...rest }) => (
    <Svg size={size} strokeWidth={strokeWidth} {...rest}>
      {paths}
    </Svg>
  );
  Icon.propTypes = { size: PropTypes.number, strokeWidth: PropTypes.number };
  return Icon;
};

export const MailIcon = icon(
  <>
    <rect x="2" y="4" width="20" height="16" rx="1" />
    <path d="M22 6 12 13 2 6" />
  </>
);

export const PhoneIcon = icon(
  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.7a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.8 2Z" />
);

export const MapPinIcon = icon(
  <>
    <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
    <circle cx="12" cy="10" r="2.5" />
  </>
);

export const HomeIcon = icon(
  <>
    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </>,
  1.6
);

export const ShieldIcon = icon(
  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />,
  1.6
);

export const ClockIcon = icon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </>,
  1.6
);

export const LayersIcon = icon(
  <>
    <path d="M12 2 2 7l10 5 10-5-10-5Z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </>,
  1.6
);

// Practice areas are matched by name so the CMS stays the source of truth for
// which areas exist; anything unmatched falls back to the "one firm, several
// areas" layers mark.
const PRACTICE_ICONS = {
  mietrecht: HomeIcon,
  versicherungsrecht: ShieldIcon,
  verkehrsrecht: ClockIcon,
};

export const practiceIcon = (title = "") =>
  PRACTICE_ICONS[title.trim().toLowerCase()] || LayersIcon;
