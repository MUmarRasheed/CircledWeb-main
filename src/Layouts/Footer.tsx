import "./Footer.scss";

import Logo from "/assets/new-logo-white.png";
import Circled from "/assets/circled-light.png";
import facebookIcon from "/assets/icons/facebook.svg";
import twitterIcon from "/assets/icons/twitter.svg";
import pintrestIcon from "/assets/icons/pintrest.svg";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation("navigation");

  return (
    <div>
      <div id="footer">
        <div className="company">
          <div className="logos">
            <img src={Logo} id="comp-logo" />
            {/* <img src={Circled} /> */}
          </div>
          <p>{t("footer.companyText")}</p>
        </div>
        <div className="topic">
          <h3>{t("footer.quickLinks")}</h3>
          <Link to="/about">{t("footer.aboutUs")}</Link>
          <Link to="/charity">{t("footer.charity")}</Link>
          <Link to="/reviews">{t("footer.reviews")}</Link>
          <Link to="/blog">{t("footer.blog")}</Link>
        </div>
        <div className="topic">
          <h3>{t("footer.meta")}</h3>
          <Link to="/terms">{t("footer.terms")}</Link>
          <Link to="/data-protection">{t("footer.dataProtection")}</Link>
          <Link to="/cookie-policy">{t("footer.cookieConsent")}</Link>
          <Link to="/imprint">{t("footer.imprint")}</Link>
        </div>
        <div className="topic">
          <h3>{t("footer.metaAndSocial")}</h3>
          <Link to="/revocation-policy">{t("footer.revocationPolicy")}</Link>
          <Link to="/contact">{t("footer.contact")}</Link>
          <Link to="/faq">{t("footer.faq")}</Link>
          <div className="flex social-icons">
            <a href="https://www.facebook.com/">
              <img src={facebookIcon} alt="" />
            </a>
            <a href="https://www.twitter.com/">
              <img src={twitterIcon} alt="" />
            </a>
            <a href="https://www.pintrest.com/">
              <img src={pintrestIcon} alt="" />
            </a>
          </div>
        </div>
      </div>
      <div className="bottom">
        <p>{t("footer.bottomText")}</p>
      </div>
    </div>
  );
}

export default Footer;
