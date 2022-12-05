import React from 'react'
import PropTypes from 'prop-types'
import { RechtPostTemplate } from '../../templates/recht-post'

const RechtPostPreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(['data']).toJS();
  const article = entry.getIn(['data', 'article']).toJS();
  //const banner = entry.getIn(['data', 'banner']).toJS();
  return (
    <RechtPostTemplate
    //   content={widgetFor('body')}
      data={data}
      image={entry.getIn(['data', 'featuredimage'])}
      picture={entry.getIn(['data', 'picture'])}
      article={article}

    />
  )
}

RechtPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default RechtPostPreview
