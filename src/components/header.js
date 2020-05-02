import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "./index.css"

const Header = ({ siteTitle }) => (
  <header>
   <div className="w-full h-12">

          <ul className="float-right">
            <li className="inline-block pr-3 pt-3 text-2xl hover:text-blue-700"><Link to="/">Home</Link></li>
            <li className="inline-block pr-3 pt-3 text-2xl hover:text-blue-700"><Link to="/about">About</Link></li>
            <li className="inline-block pr-3 pt-3 text-2xl hover:text-blue-700"><Link to="/gallery">Gallery</Link></li>
            <li className="inline-block pr-3 pt-3 text-2xl hover:text-blue-700"><a href="https://www.instagram.com/the31percent/">Instagram</a></li>
          </ul>

    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: `The Thirty-One Percent`,
}

export default Header

