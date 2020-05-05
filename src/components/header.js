import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "./index.css"

const Header = ({ siteTitle }) => (
  <header className="h-0">
    {/* <div className="fixed"> */}
<div id="menuToggle">

    <input type="checkbox" />

    <span></span>
    <span></span>
    <span></span>
    

    <ul id="menu" className="w-screen h-screen bg-blue-700 text-center flex flex-col justify-evenly right-0 bottom-0">
            <li className="-pt-5 text-white text-4xl"><Link to="/">Home</Link></li>
            <li className="text-white text-4xl"><Link to="/about">About</Link></li>
            <li className="text-white text-4xl"><Link to="/9-to-5">9-to-5</Link></li>
            <li className="text-white text-4xl"><Link to="/five-year-plan">Five-Year Plan</Link></li>
            <li className="text-white text-4xl"><Link to="/gallery">Gallery</Link></li>
            <li className="text-white text-4xl"><a href="https://www.instagram.com/the31percent/">Instagram</a></li>
          </ul>

    </div>
    {/* </div> */}
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: `The Thirty-One Percent`,
}

export default Header

