import React from "react";
import { Link } from "react-router-dom";
import classes from "./footer.module.css";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import footerLogo from "../../assets/footerLogo.png";

function Footer() {
  return (
    <section className={classes.footer_container}>
      <div>
        <div>
          <img src={footerLogo} alt="footer logo" />
        </div>
        <div className={classes.social_media}>
          <Link>{<FiFacebook />}</Link>
          <Link>{<FaInstagram />}</Link>
          <Link>{<CiYoutube />}</Link>
        </div>
      </div>
      <div>
        <h3>Useful Link</h3>
        <p>How it Works</p>
        <p>Terms of Serice</p>
        <p>Privacy Policy</p>
      </div>
      <div>
        <h3>Contact Info</h3>
        <p>Evangadi Networks</p>
        <p>support@evangadi.com</p>
        <p>+1 202 386-2702</p>
      </div>
    </section>
  );
}

export default Footer;
