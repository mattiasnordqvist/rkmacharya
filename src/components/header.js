import React from 'react'
import Img from 'gatsby-image'

import Link from 'gatsby-link'

const Header = ({ logo }) => {
  const ListLink = props =>
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>
      {props.children}
    </Link>
  </li>

  return <header style={{   
    margin: '0 auto',
    maxWidth: 960,
    padding: '1.45rem 1.0875rem',
    marginBottom: `1.5rem`, }}>
  <Link to="/" >
    <h3 style={{ display: `inline` }}><Img sizes={logo} /></h3>
  </Link>
  <ul style={{ listStyle: `none`, float: `right` }}>
    <ListLink to="/">Home</ListLink>
    <ListLink to="/about/">About</ListLink>
    <ListLink to="/contact/">Contact</ListLink>
  </ul>
</header>
  
  // <div>
  //   
  // </div>

  // <div
  //   style={{
  //     marginBottom: '1.45rem',
  //   }}
  // >
  //   <div
  //     style={{
  //       margin: '0 auto',
  //       maxWidth: 960,
  //       padding: '1.45rem 1.0875rem',
  //     }}
  //   >
  //    <Img resolutions={logo} />
  //   </div>
  // </div>
}

export default Header
