import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="edge">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
            <path
              fill="#0a2540"
              fillOpacity="1"
              d="M0,200L1440,120L01440,20L0,100Z"
            ></path>
          </svg>
        </div>
        <footer className="footer mt-auto py-3 ">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 text-muted">
                <h4>About</h4>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/about">How Roadtripper Works</Link>
                  </li>
                </ul>
              </div>
            </div>
            <hr />
            <h6 className="text-muted">
              © 2020 Roadtripper lists - a fun project
            </h6>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default Footer;
