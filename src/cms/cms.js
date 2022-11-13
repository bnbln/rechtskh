import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)

CMS.registerEditorComponent({
    // Internal id of the component
    id: "image",
    // Visible label
    label: "Image",
    // Fields the user need to fill out when adding an instance of the component
    fields: [{name: 'image', label: 'Image', widget: 'image'}],
    // Function to extract data elements from the regexp match
    fromBlock: function(match) {
      return {
        image: match[1]
      };
    },
    // Function to create a text block from an instance of this component
    toBlock: function(obj) {
        return "<div class='inline-image'> <img src="+ obj.image +" /> </div> ";
    },
    // Preview output for this component. Can either be a string or a React component
    // (component gives better render performance)
    toPreview: function(obj) {
      return (
        'image: '+obj.image +' '
      );
    }
  });

  CMS.registerEditorComponent({
    // Internal id of the component
    id: "contact",
    // Visible label
    label: "Contact",
    // Fields the user need to fill out when adding an instance of the component
    fields: [{name: 'link', label: 'Link', widget: 'text'}],
    // Function to extract data elements from the regexp match
    fromBlock: function(match) {
      return {
        link: match[1]
      };
    },
    // Function to create a text block from an instance of this component
    toBlock: function(obj) {
        return '<div class="bg-scnd container-fluid" style="margin-top:1rem;margin-bottom:1rem;"><div class="container"><div class="justify-content-center row"><div class="col-md-auto"><h2 style="text-align: right; width: fit-content;">Jetzt Kontakt aufnehmen</h2></div><div class="col-md-auto"><a href="./kontakt" class="btn btn-primary">Zum Kontaktformular</a></div></div></div></div>';
    },
    // Preview output for this component. Can either be a string or a React component
    // (component gives better render performance)
    toPreview: function(obj) {
      return (
        'contact: '+obj.contact +' '
      );
    }
  });

//   CMS.registerEditorComponent({
//     // Internal id of the component
//     id: "post",
//     // Visible label
//     label: "Post",
//     // Fields the user need to fill out when adding an instance of the component
//     fields: [{name: 'post', label: 'Related Post', widget: 'relation', collection: "blog", value_field: 'title', search_fields: 'title', display_fields: ['title', 'recht']}],
//     // Function to extract data elements from the regexp match
//     fromBlock: function(match) {
//       return {
//         post: match[1]
//       };
//     },
//     // Function to create a text block from an instance of this component
//     toBlock: function(obj) {
//         console.log(obj);
//         return '<div class="relation-banner"> <h2> Relation </h2> </div>';
//     },
//     // Preview output for this component. Can either be a string or a React component
//     // (component gives better render performance)
//     toPreview: function(obj) {
//       return (
//         'text: '+obj.post +' '
//       );
//     }
//   });