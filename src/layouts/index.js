import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import './reset.scss'
import './index.scss'

const Layout = ({ children, data }) => (
  <div id="mycode">
    <Helmet
        title={data.siteTitle.siteMetadata.title}
        meta={[
          { name: 'description', content: 'r.k.m Acharya' },
          { name: 'keywords', content: 'acharya, yoga' },
        ]}
      />
    {/* <Header></Header>*/ }
    <main>
      {children()}
    </main>
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
  }
`

    // logo: file(relativePath: {eq: "logo.png"}) {
    //   childImageSharp {
    //     resolutions(height: 38, width: 100, quality: 100) {
    //      ...GatsbyImageSharpResolutions_withWebp
    //     }
    //   }
    // }