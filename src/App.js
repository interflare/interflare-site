import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom';

// Error pages
import NotFound from './_pages/_errors/NotFound';

// Main pages
import Home from './_pages/Home';
import Join from './_pages/Join';
import Livemap from './_pages/Livemap';

// Media
import IFLRIcon from './_components/_svg/IFLRIcon';
import ENDXIcon from './_components/_svg/ENDXIcon';
import DOLogo from './_components/_svg/DOLogo';
import './_styles/_layout.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {mob_menu_open: false};
  }

  toggleMobMenu = () => {
    //this.classNameList.toggle('icon-change');
    this.setState((prevState) => ({
      mob_menu_open: prevState.mob_menu_open ? false : true
    }));
  };

  render() {
    return (
      <Router>
        <div className="off-canvas-wrapper">
          <div className="off-canvas position-right" id="side-menu" data-off-canvas data-close-on-click="false" data-content-overlay="false">
            <mobile-nav>
              <div className="logo">
                <NavLink to="/" activeClassName="" data-toggle="side-menu" onClick={this.toggleMobMenu.bind(this)}>
                  <IFLRIcon />
                  <h1>InterFlare</h1>
                </NavLink>
              </div>

              <ul>
                <li><NavLink to="https://community.interflare.net/?utm_source=iflr-site">Community</NavLink></li>
                <li><NavLink to="/map.html" data-toggle="side-menu" onClick={this.toggleMobMenu.bind(this)}>Live maps</NavLink></li>

                <li className="cta"><NavLink to="/join.html" activeClassName="" data-toggle="side-menu" onClick={this.toggleMobMenu.bind(this)}>Join us</NavLink></li>
              </ul>
            </mobile-nav>
          </div>
          <main className="off-canvas-content" data-off-canvas-content>
            <nav>
              <div className="container clearfix">
                <ul className="float-left">
                  <li className="logo">
                    <NavLink to="/" activeClassName="">
                      <IFLRIcon />
                      <h1>InterFlare</h1><p>&trade;</p>
                    </NavLink>
                  </li>
                  <div className="items hide-for-small-only">
                    <li><NavLink to="https://community.interflare.net/?utm_source=iflr-site">Community</NavLink></li>
                    <li><NavLink to="/map.html" >Live maps</NavLink></li>
                  </div>
                </ul>
                <ul className="float-right">
                  <li className="show-for-small-only">
                    <a className={ this.state.mob_menu_open ? "icon-container icon-change" : "icon-container" } data-toggle="side-menu" onClick={this.toggleMobMenu.bind(this)}>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </a>
                  </li>
                  <li className="cta hide-for-small-only"><NavLink to="/join.html" activeClassName="">Join us</NavLink></li>
                </ul>
              </div>
            </nav>

            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/map.html" component={Livemap} />
              <Route path="/join.html" component={Join} />
              <Route component={NotFound}/>
            </Switch>

            <footer>
              <div className="container">
                <a href="https://m.do.co/c/f8ffd8a5f356" className="do hide-for-small-only"><DOLogo /></a>
                <a href="https://endogix.com/?utm_source=iflr-site"><ENDXIcon /></a>
                <div className="brand">
                  <p>&copy; <a href="https://endogix.com/?utm_source=iflr-site">Endogix</a>&trade; 2018</p>
                  <p>Hello from Auckland</p>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
