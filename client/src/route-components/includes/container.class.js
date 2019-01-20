import React, { Component } from "react";
import Header from "./header.class";
import Footer from "./footer.class";

export default class Container extends Component {
  render() {
    return (
      <div className="siteSubPageContainer">
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
