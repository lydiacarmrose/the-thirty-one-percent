import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "./index.css"

const Header = ({ siteTitle }) => (
  <header>
   <div className="menu-wrap">
    <input type="checkbox" class="toggler">
    <div className="hamburger"><div></div></div>
    <div className="menu">
      <div>
        <div>
          <ul>
            <li><Link to="#">Home</Link></li>
            <li><Link to="#">About</Link></li>
            <li><Link to="#">Services</Link></li>
            <li><Link to="#">Contact</Link></li>
          </ul>
        </div>
      </div>
    </div>
  </input>
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

