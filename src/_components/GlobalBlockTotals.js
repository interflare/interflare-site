import React, { Component } from 'react';

import SmallLoader from './SmallLoader';

const prettyNum = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

class GlobalBlockTotals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      diff: 0,
      placed: 0,
      broken: 0
    }
  }

  componentDidMount() {
    let xhrStart = new Date();
    window.$.getJSON(`https://us-central1-interflare-minecraft.cloudfunctions.net/gameinfo-blockcounts?pid=0&wid=0`)
      .done((payload) => {
        let xhrTSDiff = new Date() - xhrStart;
        console.info(`GlobalBlockTotals: completed xhr in ${xhrTSDiff}ms`);

        this.setState({
          diff: payload.data.placed - payload.data.broken,
          placed: payload.data.placed,
          broken: payload.data.broken
        });
      })
      .fail((xhr, txtStatus, err) => {
        let xhrTSDiff = new Date() - xhrStart;
        console.error(`GlobalBlockTotals: failed (${xhrTSDiff}ms) - ${err}`);
      });
  }


  render() {
    return (
      <div>
        <div className="grid-x grid-margin-x align-center">
          <div className="large-4 cell hide-for-small-only hide-for-medium-only">
            <div className="bignum">{ this.state.diff ? prettyNum(this.state.diff) : <SmallLoader className="test" />}</div>
            <p className="numexp">Total diff</p>
          </div>
          <div className="large-4 medium-6 cell">
            <div className="bignum">{ this.state.placed ? prettyNum(this.state.placed) : <SmallLoader className="test" />}</div>
            <p className="numexp">Total blocks placed</p>
          </div>
          <div className="large-4 medium-6 cell hide-for-small-only">
            <div className="bignum">{ this.state.broken ? prettyNum(this.state.broken) : <SmallLoader className="test" />}</div>
            <p className="numexp">Total blocks broken</p>
          </div>
        </div>
      </div>
    );
  }
}

export default GlobalBlockTotals;
