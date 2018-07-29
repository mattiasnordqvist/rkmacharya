import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

import './index.scss'

const Layout = ({ children, data }) => (
  
  <div id="container">
  <Helmet
      title={data.siteTitle.siteMetadata.title}
      meta={[
        { name: 'description', content: 'r.k.m Acharya' },
        { name: 'keywords', content: 'acharya, yoga' },
      ]}
    />
  <header>
  <nav style={{display: 'flex', justifyContent: 'space-between' }}>
       <div style={{display: 'inline'}}>
         <Link to="/" style={{ fontWeight: '500', fontSize: '30px'}}>RKM Acharya</Link>
       </div>
       <div style={{display: 'inline', marginTop: 'auto'}}>
         <Link to="/acharyaratheeshkmani" activeClassName="active">ACHARYA Ratheesh K. Mani</Link>
         <Link to="/origin" activeClassName="active">Origin</Link>
         <Link to="/rkmacharyayoga" activeClassName="active">RKM Acharya Yoga</Link>
         <Link to="/layayogasystem" activeClassName="active">Laya Yoga System</Link>
         <Link to="/ayuryogatherapy" activeClassName="active">Ayur Yoga Therapy</Link>
         <Link to="/communities" activeClassName="active">Communities</Link>
       </div>
     </nav> 
  </header>
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

    logo: file(relativePath: {eq: "logo.png"}) {
      childImageSharp {
        resolutions(height: 38, width: 100, quality: 100) {
         ...GatsbyImageSharpResolutions_withWebp
        }
      }
    }
  }
`
