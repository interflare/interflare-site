import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LightningIcon from '../_components/_svg/LightningIcon';
import NetworkIcon from '../_components/_svg/NetworkIcon';
import PadlockIcon from '../_components/_svg/PadlockIcon';
import PaletteIcon from '../_components/_svg/PaletteIcon';
import PlanetIcon from '../_components/_svg/PlanetIcon';

import '../_styles/home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <div className="jumbo" style={ { background: `url('assets/img/jumbo-header-01.jpg') center no-repeat` } }>
          <div className="overlay">
            <div className="container">
              <div className="grid-x grid-margin-x align-middle">
                <div className="medium-10 medium-offset-1 cell">
                  <div className="grid-x grid-margin-x align-middle">
                    <div className="medium-8 cell">
                      <h1>InterFlare Minecraft</h1>
                      <h3>The home of your next big project.</h3>
                    </div>
                    <div className="medium-4 cell">
                      <p className="cta"><a href="#join" data-smooth-scroll>Join us today</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="dark" id="counts">
          <div className="container">
            <div component="block/home/container">
              <div className="grid-x grid-margin-x align-center">
                <div className="large-4 cell hide-for-small-only hide-for-medium-only">
                  <p className="bignum" component="block/home/total">0</p>
                  <p className="numexp">Total blocks</p>
                </div>
                <div className="large-4 medium-6 cell">
                  <p className="bignum" component="block/home/placed">0</p>
                  <p className="numexp">Total blocks placed</p>
                </div>
                <div className="large-4 medium-6 cell hide-for-small-only">
                  <p className="bignum" component="block/home/broken">0</p>
                  <p className="numexp">Total blocks broken</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="reasons">
          <div className="container">
            <h2 className="text-center">Exactly what you need from a server</h2>

            <div className="grid-x grid-margin-x align-center" data-equalizer>
              <div className="medium-4 cell padded" data-equalizer-watch>
                <PlanetIcon />
                <h4>Custom private worlds</h4>
                <p>
                  As an alternative to hosting your
                  own server for a project, you
                  can rent a private world for you
                  and your builders.
                </p>
              </div>
              <div className="medium-4 cell padded" data-equalizer-watch>
                <PaletteIcon />
                <h4>WorldEdit available</h4>
                <p>
                  Players that have been playing for a
                  certain amount of time are granted
                  access to a limited version of
                  WorldEdit.
                </p>
              </div>
              <div className="medium-4 cell padded" data-equalizer-watch>
                <NetworkIcon />
                <h4>Web world maps</h4>
                <p>
                  An online map can be extremely useful
                  when working on projects with a large
                  footprint, which is why we provide an
                  easy-to-use web map to assist you.
                </p>
              </div>
              <div className="medium-4 cell padded" data-equalizer-watch>
                <PadlockIcon />
                <h4>Hardened protection</h4>
                <p>
                  To prevent griefing in the public
                  worlds, we log all actions through
                  CoreProtect, and offer self-service
                  and managed WorldGuard.
                </p>
              </div>
              <div className="medium-4 cell padded" data-equalizer-watch>
                <LightningIcon />
                <h4>Lightning fast connection</h4>
                <p>
                  We use top of the line cloud services
                  with a redundant 40gbps network to
                  ensure that our servers are fast and
                  responsive.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="dark" id="join">
          <div className="container">
            <h2 className="lesser">Join us today</h2>
            <div className="input-group">
              <span className="input-group-label">MC v1.12.1</span>
              <input className="input-group-field" type="text" defaultValue="c.interflare.net" />
            </div>
            
            <p><Link to="./join.html">Need help setting your game version?</Link></p>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
