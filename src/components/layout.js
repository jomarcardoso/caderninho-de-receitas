/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import Main from "./main"
import Footer from './footer';

const Layout = ({ children, pageName='' }) => {
  return (
    <>
      <Header pageName={pageName} />
      <Main>
        {children}
      </Main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
