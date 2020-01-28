/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  

  return (
    <>
      <Header />

        
        <main>
        <div className="container">
        
          {children}
          </div>
        
          </main>
        </>
       
       
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
