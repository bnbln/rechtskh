const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = 'https://klarheitundrecht.netlify.app/',
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV
} = process.env;
const isNetlifyProduction = NETLIFY_ENV === 'production';
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
 })

//console.log("ga-id ",process.env.GA_ID); 

module.exports = {
  siteMetadata: {
    siteUrl,
    title: "Rechtsklarheit.de",
    description:
      "Rechtsanwalt Tarik Sharief - Kanzlei am Berliner Wittenbergplatz. Ihr Partner für Versicherungsrecht, Verkehrsrecht und Mietrecht",
      //gaId: process.env.GA_ID,
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-sass",
      options: {
        sassOptions: {
          indentedSyntax: false,
        },
      },
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "uploads",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/img`,
        name: "images",
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'content',
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              name: "uploads",
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static",
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: "gatsby-plugin-purgecss", // purges all unused/unreferenced css rules
      options: {
        develop: true, // Activates purging in npm run develop
        purgeOnly: ["/all.scss"], // applies purging only on the bulma css file
      },
    }, // must be after other CSS plugins
    // {
    //   resolve: `gatsby-plugin-google-gtag`,
    //   options: {
    //     // You can add multiple tracking ids and a pageview event will be fired for all of them.
    //     trackingIds: [
    //       process.env.GA_ID, // Google Analytics / GA
    //     ],
    //     gtagConfig: {
    //       anonymize_ip: true,
    //     },
    //     // This object is used for configuration specific to this plugin
    //     pluginConfig: {
    //       // Puts tracking script in the head instead of the body
    //       head: true,
    //       // Setting this parameter is also optional
    //       respectDNT: true,
    //       // Avoids sending pageview hits from custom paths
    //       exclude: ["/preview/**", "/do-not-track/me/too/"],
    //     },
    //   },
    // },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: ['/admin', '/404', '/kontakt/examples', '/kontakt/file-upload', '/kontakt/thanks'],
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{userAgent: '*'}],
            sitemap: siteUrl + '/sitemap/sitemap-index.xml',
          },
          'branch-deploy': {
            policy: [{userAgent: '*', disallow: ['/']}],
            sitemap: null,
            host: null
          },
          'deploy-preview': {
            policy: [{userAgent: '*', disallow: ['/']}],
            sitemap: null,
            host: null
          }
        }
      }
    },
    "gatsby-plugin-netlify", // make sure to keep it last in the array
  ],
};
