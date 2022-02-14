import React from 'react'
import PropTypes from 'prop-types'
import { IndexPageTemplate } from '../../templates/index-page'

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS();
  const images = [
    {
      title:  data.images[0].title, 
      image: getAsset(data.images[0].image), 
      link: data.images[0].link
    },
    {
      title:  data.images[1].title, 
      image: getAsset(data.images[1].image), 
      link: data.images[1].link
    }
  ];
  console.log(images)


  if (data) {
    return (
      <IndexPageTemplate
        images={images}
        title={data.title}
        lead={data.lead}
        ctatext={data.ctatext}
        ctalink={data.ctalink}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default IndexPagePreview
