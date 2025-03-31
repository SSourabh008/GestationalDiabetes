import React from 'react'
import "./Footer.css"
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} GDP. All rights reserved.</p>
        <p>
          Made by <strong>Sourabh and Samarth</strong>
        </p>
      </div>
    </footer>
  )
}

export default Footer