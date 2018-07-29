import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/header'
import './index.scss'

const Layout = ({ children, data }) => (
  <div style={{overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
    <Helmet
      title={data.siteTitle.siteMetadata.title}
      meta={[
        { name: 'description', content: 'r.k.m Acharya' },
        { name: 'keywords', content: 'acharya, yoga' },
      ]}
    />
    <Header logo={data.logo.childImageSharp.resolutions} />
    <div
      style={{
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 100,
        flexGrow: 1,
        overflowY: 'auto',
      }}
    >
      {children()}
    </div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query layoutIndexQuery {
    siteTitle: site {
      siteMetadata {
        title
      }
    }

    logo: file(relativePath: {eq: "logo.png"}) {
      childImageSharp {
        resolutions(height: 38, width: 100, quality: 100) {
         ...GatsbyImageSharpResolutions_withWebp
        }
      }
    }
  }
`
