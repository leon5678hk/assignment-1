import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="appStoreLinks">
      </div>
      <div className="footerLinks">
        <div className="linkColumn">
          <h4>Watch</h4>
          <ul>
            <li>Movies</li>
            <li>TV</li>
            <li>Free</li>
          </ul>
        </div>
        <div className="linkColumn">
          <h4>My Account</h4>
          <ul>
            <li>Account</li>
            <li>Settings</li>
            <li>Manage Devices</li>
          </ul>
        </div>
        <div className="linkColumn">
          <h4>Features</h4>
          <ul>
            <li>Lists</li>
            <li>Family</li>
            <li>Disc to Digital</li>
            <li>InstaWatch</li>
            <li>Movies Anywhere</li>
          </ul>
        </div>
        <div className="linkColumn">
          <h4>Help</h4>
          <ul>
            <li>About Us</li>
            <li>Devices</li>
            <li>Support</li>
            <li>Forums</li>
            <li>Contact Us</li>
            <li>Jobs</li>
          </ul>
        </div>
      </div>
      <div className="socialMediaIcons">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
      </div>
    </footer>
  );
};

export default Footer;