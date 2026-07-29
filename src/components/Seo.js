import React from "react";
import { graphql, useStaticQuery } from "gatsby";

const DEFAULT_IMAGE = "/img/og-image.jpg";

const normalizePath = (pathname = "/") => {
  const cleanPath = pathname.split(/[?#]/, 1)[0] || "/";
  return cleanPath === "/" ? "/" : `${cleanPath.replace(/\/+$/, "")}/`;
};

const absoluteUrl = (value, siteUrl) => {
  const target = value || DEFAULT_IMAGE;
  if (/^https?:\/\//i.test(target)) return target;
  return `${siteUrl}${target.startsWith("/") ? target : `/${target}`}`;
};

const Seo = ({
  title,
  description,
  pathname,
  image,
  noindex = false,
  type = "website",
  datePublished,
}) => {
  const { site } = useStaticQuery(graphql`
    query SeoDefaults {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `);

  const metadata = site.siteMetadata;
  const pageTitle =
    !title || title === metadata.title
      ? metadata.title
      : `${title} | ${metadata.title}`;
  const pageDescription = description || metadata.description;
  const canonicalUrl = absoluteUrl(normalizePath(pathname), metadata.siteUrl);
  const socialImage = absoluteUrl(image, metadata.siteUrl);

  const legalService = {
    "@type": "LegalService",
    "@id": `${metadata.siteUrl}/#kanzlei`,
    name: "Rechtsanwaltskanzlei Tarik Sharief",
    url: metadata.siteUrl,
    image: socialImage,
    telephone: "+49 30 69533361",
    email: "kanzlei@rechtsklarheit.de",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ansbacher Straße 13",
      postalCode: "10787",
      addressLocality: "Berlin",
      addressCountry: "DE",
    },
  };

  const pageSchema =
    type === "article"
      ? {
          "@type": "Article",
          "@id": `${canonicalUrl}#article`,
          headline: title,
          description: pageDescription,
          image: socialImage,
          datePublished,
          mainEntityOfPage: canonicalUrl,
          author: { "@type": "Person", name: "Tarik Sharief" },
          publisher: { "@id": `${metadata.siteUrl}/#kanzlei` },
        }
      : {
          "@type": pathname === "/" ? "WebSite" : "WebPage",
          "@id": `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: pageTitle,
          description: pageDescription,
          about: { "@id": `${metadata.siteUrl}/#kanzlei` },
        };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [legalService, pageSchema],
  };

  return (
    <>
      <html lang="de" />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:locale" content="de_DE" />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={metadata.title} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:alt" content={title || metadata.title} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={socialImage} />

      <meta name="theme-color" content="#172340" />
      <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png" />
      <link rel="mask-icon" href="/img/safari-pinned-tab.svg" color="#172340" />

      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </>
  );
};

export default Seo;
