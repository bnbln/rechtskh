import React from 'react'
import PropTypes from 'prop-types'
import { ImpressumPageTemplate } from '../../templates/impressum-page'

const ImpressumPagePreview = ({ entry, widgetFor }) => {
  //const data = entry.getIn(['data']).toJS();
  
  return (
  <>
  <ImpressumPageTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
  </>
)
  }

ImpressumPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default ImpressumPagePreview
