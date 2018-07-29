import React from 'react'
import Img from 'gatsby-image'

import Link from 'gatsby-link'

const Header = ({ logo }) => {
  return <header style={{
    // margin: '0 auto',
    padding: '1.45rem 1.0875rem',
    flexShrink: 0,
  }}>
    <nav style={{display: 'flex', justifyContent: 'space-between'}}>
      {/* <Img sizes={logo} /> */}
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
      {/* <Link to="/teachers">Lärare</Link>
      <Link to="/classcard">Klippkort</Link> */}
    </nav>
    {/* <h2 style={{ margin: '0 -9999rem', padding: '0.25rem 9999rem' }}>

      <ul style={{ display: 'block', listStyle: `none`, float: `right` }}>
        <li style={{ display: `inline-block`, marginRight: `1rem` }}>
          <Link to="/">
          <Img sizes={logo} />
                    </Link>
        </li>
        <li style={{ display: `inline-block`, marginRight: `1rem` }}>
          <Link to="/teachers">
            Lärare    
          </Link>
        </li>
        <li style={{ display: `inline-block`, marginRight: `1rem` }}>
          <Link to="/classcard">
            Klippkort
          </Link>
        </li>

      </ul>
    </h2> */}
  </header>
}

export default Header
