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
  // const cta = [
  //   data.cta.text,
  //   data.cta.link
  // ]
  const hero = {
    images: images,
    title: data.hero.title,
    lead: data.hero.lead,
    cta: data.hero.cta
  }
  const rechtsgebiete = {lead: data.recht.lead}
  const settings = data.settings
  


  console.log(rechtsgebiete)



  if (data) {
    return (
      <IndexPageTemplate
        hero={hero}
        rechtsgebiete={rechtsgebiete}
        settings={settings}
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
