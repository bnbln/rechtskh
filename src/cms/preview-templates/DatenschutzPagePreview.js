import React from 'react'
import PropTypes from 'prop-types'
import { DatenschutzPageTemplate } from '../../templates/datenschutz-page'

const DatenschutzPagePreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(['data']).toJS();
  
  return (
  <>
  <DatenschutzPageTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
  </>
)
  }

DatenschutzPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default DatenschutzPagePreview
