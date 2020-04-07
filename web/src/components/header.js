import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import logo from "../images/headlogo.png"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `black`,
      marginBottom: `1.45rem`,
      opacity:1,
      height: `74px`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: `100%`,
         padding: `20px`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <a
          href="https://rkmyoga.com/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <img src={logo} alt="RKM Yoga"
            style={{
              paddingLeft: `20px`,
              height: `auto`,
              maxHeight: `100px`,
              width: `195px`,
              maxWidth: `100%`,
            }}/>
          {/* {siteTitle} */}
        </a>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
