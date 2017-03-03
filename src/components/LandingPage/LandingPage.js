/**
 * Created by xinzheng on 3/2/17.
 */

import React from "react";
import "./LandingPage.css"
import landing from "../../img/landing.png"
import { Link } from "react-router";


import ReactDOM from "react-dom";
import { App, Code,
  CustomerQuote, CustomerQuotes,
  DropdownMenu, DropdownToggle,
  Footer, FooterAddress,
  Hero,
  HorizontalSplit,
  ImageList, ImageListItem,
  Navbar, NavItem,
  Page,
  PricingPlan, PricingTable,
  Section,
  SignupInline, SignupModal,
  Stripe,
  Team,
  TeamMember, } from "neal-react";



const brandName = "CoAXs";
const brand = <span>{brandName}</span>;

class LandingPage extends React.Component {
  render() {
    return (
      <App>
        <Page>


          <Hero
                className="text-xs-center" backgroundImage={landing} style={{height: "100%", width: "100%"}}>
            {/*<video autoPlay muted loop style={{height: "100%", width: "100%"}}>*/}
              {/*<source src="http://coaxs.mit.edu/video/30secfromContour.mp4" type="video/mp4"></source>*/}

            {/*</video>*/}
            <Navbar brand={brand}>
            </Navbar>

            <h1 className="display-4"> Declarative Landing Pages for React.js </h1>
            <p className="lead">Build a beautiful landing page in less than an hour.
              No more redundant code. Easily extensible.</p>
            <p>
              <a href="https://github.com/dennybritz/neal-react" target="_blank" className="btn btn-white">
                Get it on Github
              </a>
            </p>
          </Hero>

          <Section heading={"Hello!"}>
            <HorizontalSplit padding="md"> {} </HorizontalSplit>
          </Section>
        </Page>
      </App>
    );
  }
}

export default LandingPage
