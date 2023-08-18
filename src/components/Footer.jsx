import React from 'react'
import './Footer.css'
export default function Footer() {
  return (
    
      <footer id="footercontent" className="footer-bg">
        <div className="container">
          <div className="footer-container row">
            <div className="footer-item col-sm-3 collapsible-xs">
              <div>
                <h4 className="title d-none d-sm-block">Contacts</h4>
              </div>
              <ul id="collapsible-account" className="menu-footer content">

                <a href="sms:800-946-3482#">
                  <i className="fa-solid fa-phone"></i>
                  <font style={{ verticalAlign: "inherit" }}>
                    <font style={{ verticalAlign: "inherit" }}>(800) 946-3482</font>
                  </font><br />
                </a>
                <a href="mailto:letters@godiva.com">
                  <i className="fa-regular fa-envelope" />
                  <font style={{ verticalAlign: "inherit" }}>
                    <font style={{ verticalAlign: "inherit" }}>
                      letters@godiva.com
                    </font>
                  </font>
                </a>
        </ul>
              <div className="footer-item desktop">
                <h4 className="title d-none d-sm-block" aria-expanded="true">
                  Payments Accepted
                </h4>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPovBnM0dk-RC3PzGIXMRNSiz6zupkOVgunA&usqp=CAU"
                  alt="We accept Visa, Mastercard, American Express, Discover."
                  title="Visa, Mastercard, American Express, Discover."
                  style={{
                    width: 200,
                    maxWidth: "100%",
                    padding: "0px 0px 20px 0px"
                  }}
                />
              </div>
            </div>
            <div className="footer-item col-sm-3 collapsible-xs">
              <div>
                <button
                  aria-controls="collapsible-account"
                  aria-expanded="false"
                  className="title btn text-left btn-block d-sm-none"
                >
                  Business accounts
                </button>
                <h4 className="title d-none d-sm-block">Business accounts</h4>
              </div>
              <ul className="menu-footer content" id="collapsible-account">

                <a href="sms:877-267-7847#">
                  <i className="fa-solid fa-phone"></i>
                  <font style={{ verticalAlign: "inherit" }}>
                    <font style={{ verticalAlign: "inherit" }}>(877) 267-7847</font>
                  </font><br />
                </a>
                <a href="mailto:godiva.corporatesales@godiva.com">
                  <i className="fa-regular fa-envelope" />
                    <font  style={{ verticalAlign: "inherit" }}>
                 corporatesales@godiva.com
                    </font>
                </a><br />
                <a href="https://www.godiva.com/on/demandware.store/Sites-Godiva-Site/en_US/BusinessRequest-Account">
                  Business Account Request
                </a><br />
                <a
                  href="https://www.godiva.com/on/demandware.static/-/Sites-Godiva-Library/default/dw6e5b27bd/Godiva-Business-Email-Order-Form-2022.xlsm"
                  target="_blank"
                >
                  Business Email Order Form{" "}
                </a><br />
                <a href="https://www.godiva.com/corporate-gifts">Business Gifts</a>
              </ul>
            </div>
            <div className="footer-item col-sm-3 collapsible-xs">
              <div>
                <button
                  aria-controls="collapsible-account"
                  aria-expanded="false"
                  className="title btn text-left btn-block d-sm-none"
                >
                  Customer Service
                </button>
                <h4 className="title d-none d-sm-block">Customer Service</h4>
              </div>
              <ul className="menu-footer content" id="collapsible-account">

                <a href="/on/demandware.store/Sites-Godiva-Site/en_US/Login-Show">
                  Order Tracking
                </a><br />



                <a href="https://www.godiva.com/shipping-information/Shipping-Info.html">
                  Shipping Info
                </a><br />
                <a href="https://www.godiva.com/return-policy/returnsPolicy.html">
                  Return Policy
                </a><br />
                <a href="https://www.godiva.com/customer-assistance/faq.html">
                  FAQs
                </a><br />
                <a href="https://www.godiva.com/on/demandware.store/Sites-Godiva-Site/en_US/Giftcards-Balancecheck">
                  Gift Card Balance
                </a><br />
              </ul>
            </div>
            <div className="footer-item col-sm-3 collapsible-xs">
              <div>
                <button
                  aria-controls="collapsible-account"
                  aria-expanded="false"
                  className="title btn text-left btn-block d-sm-none"
                >
                  News and updates
                </button>
                <h4 className="title d-none d-sm-block">News and updates</h4>
              </div>
              <ul className="menu-footer content" id="collapsible-account">

                <a href="/newsroomhome/newsroomHome.html" target="_self">
                  GODIVA Newsroom
                </a>


              </ul>
              <div className="footer-container row justify-content-end mobile">
              </div>
              <div className="footer-item desktop">
                <h4 className="title d-none d-sm-block" aria-expanded="true">
                  Connect with us
                </h4>
                <ul className="social-links">

                  <a
                    className="fa fa-instagram fa-3x"
                    aria-label="Instagram"
                    href="https://www.instagram.com/godiva/"
                    target="_blank"
                  />



                  <a
                    className="fa fa-facebook-square fa-3x"
                    aria-label="Facebook"
                    href="https://www.facebook.com/Godiva"
                    target="_blank"
                  />



                  <a
                    className="fa fa-twitter-square fa-3x"
                    aria-label="Twitter"
                    href="https://twitter.com/godiva"
                    target="_blank"
                  />



                  <a
                    className="fa fa-pinterest-square fa-3x"
                    aria-label="Pinterest"
                    href="https://www.pinterest.com/godiva/"
                    target="_blank"
                  />



                  <a
                    className="fa fa-linkedin-square fa-3x"
                    aria-label="LinkedIn"
                    href="https://www.linkedin.com/company/godiva-chocolatier/ "
                    target="_blank"
                  />
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-container row footer__info">
            <div className="copyright">
              <font style={{ verticalAlign: "inherit" }}>
                <font style={{ verticalAlign: "inherit" }}>©2022 Godiva</font>
              </font>
            </div>
            <div className="bottom-menu">
              <a
                className="flinks"
                href="https://www.godiva.com/on/demandware.store/Sites-Godiva-Site/en_US/SiteMap-SiteMap"
              >
                Sitemap
              </a>{" "}
              <a
                className="flinks"
                href="/terms-and-conditions-of-web-site-usage/terms-of-use.html"
              >
                Terms of Use
              </a>{" "}
              <a className="flinks" href="/privacy-policy/privacyPolicy2.html">
                Privacy Policy
              </a>{" "}
              <a
                className="flinks"
                href="/california-consumer-privacy-act/california-consumer-privacy-act.html"
              >
                <font style={{ verticalAlign: "inherit" }}>
                  <font style={{ verticalAlign: "inherit" }}>CCPA</font>
                </font>
              </a>{" "}
              <a
                className="flinks"
                href="https://www.godiva.com/promotion-terms-and-conditions"
              >
                Promo Terms &amp; Conditions
              </a>{" "}
              <a
                className="flinks"
                href="https://www.godiva.com/accessibility_statement/accessibility_statement.html"
              >
                Accessibility Statement
              </a>
              &nbsp;
              <a
                className="flinks"
                href="https://www.linkedin.com/company/godiva-chocolatier/jobs"
                target="_blank"
              >
                Careers
              </a>
            </div>
            <div className="dropdown dropup js-country-menu">
              <div className="flag-icon flag-icon-us" />
              <img  className="image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/285px-Flag_of_the_United_States.svg.png" alt="" />
              <a
                className="dropdown-toggle"
                role="button"
                id="country-menu"
                href="#"
                data-toggle="dropdown"
              >
                United States
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <div className="dropdown-item">
                  <div className="flag-icon flag-icon-au" />
                  <a
                    href="http://www.godiva.com.au/"
                    data-currency="null"
                    data-locale="en_AU"
                    className="localeLink"
                  >
                    Australia
                  </a>
                </div>
                <div className="dropdown-item">
                  <div className="flag-icon flag-icon-ca" />
                  <a
                    href="http://www.godiva.ca/"
                    data-currency="CAN"
                    data-locale="en_CA"
                    className="localeLink"
                  >
                    <font style={{ verticalAlign: "inherit" }}>
                      <font style={{ verticalAlign: "inherit" }}>Canada</font>
                    </font>
                  </a>
                </div>
                <div className="dropdown-item">
                  <div className="flag-icon flag-icon-fr" />
                  <a
                    href="http://www.godivachocolates.eu/"
                    data-currency="EUR"
                    data-locale="fr_FR"
                    className="localeLink"
                  >
                    France
                  </a>
                </div>
                <div className="dropdown-item">
                  <div className="flag-icon flag-icon-de" />
                  <a
                    href="http://www.godivachocolates.eu/"
                    data-currency="null"
                    data-locale="de_DE"
                    className="localeLink"
                  >
                    Germany
                  </a>
                </div>
                <div className="dropdown-item">
                  <div className="flag-icon flag-icon-hk" />
                  <a
                    href="https://www.godiva.com.hk/"
                    data-currency="null"
                    data-locale="zh_HK"
                    className="localeLink"
                  >
                    <font style={{ verticalAlign: "inherit" }}>
                      <font style={{ verticalAlign: "inherit" }}>Hong Kong SAR</font>
                    </font>
                  </a>
                </div>
                <div className="dropdown-item">
                  <div className="flag-icon flag-icon-jp" />
                  <a
                    href="http://www.godiva.co.jp/"
                    data-currency="JPY"
                    data-locale="ja_JP"
                    className="localeLink"
                  >
                    Japan
                  </a>
                </div>
                <div className="dropdown-item">
                  <div className="flag-icon flag-icon-kr" />
                  <a
                    href="http://www.godiva.kr/"
                    data-currency="null"
                    data-locale="ko_KR"
                    className="localeLink"
                  >
                    Korea
                  </a>
                </div>
                <div className="dropdown-item">
                  <div className="flag-icon flag-icon-cn" />
                  <a
                    href="http://www.godiva.cn/"
                    data-currency="CNY"
                    data-locale="zh_CN"
                    className="localeLink"
                  >
                    Mainland China
                  </a>
                </div>
                <div className="dropdown-item">
                  <div className="flag-icon flag-icon-sg" />
                  <a
                    href="https://www.godiva.com.sg"
                    data-currency="null"
                    data-locale="en_SG"
                    className="localeLink"
                  >
                    Singapore
                  </a>
                </div>
                <div className="dropdown-item">
                  <div className="flag-icon flag-icon-nl" />
                  <a
                    href="http://www.godivachocolates.eu/"
                    data-currency="null"
                    data-locale="nl_NL"
                    className="localeLink"
                  >
                    The Netherlands
                  </a>
                </div>
                <div className="dropdown-item">
                  <div className="flag-icon flag-icon-tr" />
                  <a
                    href="https://www.godiva.com.tr/"
                    data-currency="null"
                    data-locale="tr_TR"
                    className="localeLink"
                  >
                    Turkey
                  </a>
                </div>
                <div className="dropdown-item">
                  <div className="flag-icon flag-icon-gb" />
                  <a
                    src="https://morbai.com/wp-content/uploads/2019/12/united-kingdom-flag.jpg"
                    data-currency="GBP"
                    data-locale="en_GB"
                    className="localeLink"
                  >
                    United Kingdom
                  </a>
                </div>
                <div className="dropdown-item"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>


  )
}
