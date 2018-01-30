import React, { Component } from 'react';
import '../_styles/livemap.css';

class Livemap extends Component {
  componentDidMount() {
    window.$('html, body').animate({ scrollTop: 0 }, 400);
    window.$(document).foundation();
  }

  render() {
    return <iframe title="InterFlare Livemap" id="livemap" src={ `https://c-map.interflare.net/${window.location.search}` }></iframe>;
  }
}

export default Livemap;
