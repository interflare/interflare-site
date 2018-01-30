import React, { Component } from 'react';

class Join extends Component {
  componentDidMount() {
    window.$('html, body').animate({ scrollTop: 0 }, 400);
    window.$(document).foundation();
  }

  render() {
    return (
      <page>
        <section id="join" style={ {padding: `50px 0`} }>
          <div className="container">
            <h2 className="lesser">Join us today</h2>
            <div className="input-group">
              <span className="input-group-label">MC v1.12.1</span>
              <input className="input-group-field" type="text" defaultValue="c.interflare.net" />
            </div>
          </div>
        </section>

        <article className="container">
          <bread-nav aria-label="You are here:" role="navigation">
            <ul className="breadcrumbs container">
              <li><a href="/">Home</a></li>
              <li>
                <span className="show-for-sr">Current: </span> Join
              </li>
            </ul>
          </bread-nav>

          <div className="container">
            <h2>Setting your Minecraft version</h2>
            <p>
              Because Minecraft is constantly being updated, we have to try our best to
              strike a balance between the new features from updates, and server stability.
            </p>
            <p>
              This means that we will most likely be a version behind the offical
              releases for anywhere up to a week. If you want to join the server during
              this awkward transition period, you will have to set your Minecraft version
              in the launcher:
            </p>

            <div className="grid-x grid-margin-x" data-equalizer>
              <div className="medium-4 cell">
                <h4 className="series under">Step 1</h4>
                <p data-equalizer-watch>
                  Click on the hamburger icon in the launcher, and select
                  "launch options" and then "add new".
                </p>
                <img src="assets/img/mc-version-steps/1.png" alt="The hamburder icon is located in the top right area of the launcher" />
              </div>
              <div className="medium-4 cell">
                <h4 className="series under">Step 2</h4>
                <p data-equalizer-watch>
                  Under "Version", select the current version of the server,
                  which is release 1.12.1. Click save.
                </p>
                <img src="assets/img/mc-version-steps/2.png" alt="Select the version that matches the servers" />
              </div>
              <div className="medium-4 cell">
                <h4 className="series under">Step 3</h4>
                <p data-equalizer-watch>
                  When you return back to the home screen, click the arrow
                  next to "play" and select the profile you just created.
                </p>
                <img src="assets/img/mc-version-steps/3.png" alt="Go back to the news screen, and hit the drop-down to select the profile you just added" />
              </div>
            </div>
          </div>
        </article>
      </page>
    );
  }
}

export default Join;
