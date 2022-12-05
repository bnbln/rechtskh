import React from 'react'
import PropTypes from 'prop-types'
import { AboutPageTemplate } from '../../templates/about-page'

const AboutPagePreview = ({ entry, widgetFor }) => {
  //const data = entry.getIn(['data']).toJS();
  const list = entry.getIn(['data', 'list']).toJS();
  console.log(list);
  
  return (
  <>
  <AboutPageTemplate
    title={entry.getIn(['data', 'title'])}
    list={list}
    image={entry.getIn(['data', 'featuredimage'])}
    content={widgetFor('body')}
    subtitle={entry.getIn(['data', 'subtitle'])}
  />
  </>
)
  }

AboutPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default AboutPagePreview
