import React, { Component } from "react";
import Banner from "./Banner";
import altRoad from "../images/altRoad.JPG";
import soccerGame from "../images/soccerGame.JPG";
import { Link } from "react-router-dom";

class Landing extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Banner />
        <section className="section">
          <div className="container">
            <h3 className="text-center pb-3 pt-3">
              There are lists for virtually anything...
            </h3>
            <div className="px-2 mt-2 mb-2">
              <p className="lead">
                Maybe you found a really cool water bottle that saved you some
                weight. Or you could have found the
                <span className="font-italic"> perfect</span> hiking boots.
                Create a list so others can see what they've been missing. Help
                others make sure they have the trip of a lifetime.
              </p>
            </div>
            <div className="row">
              <div className="card-deck">
                <div className="card shadow">
                  <img
                    src={soccerGame}
                    alt="..."
                    className="card-img-top"
                  ></img>
                  <div className="card-body">
                    <h5 className="card-title">
                      Had a great time at the ballpark?
                    </h5>
                    <hr />
                    <p className="card-text">
                      I love sports, one of my favorite things to do in a new
                      city is check out the local stadium and catch a game.
                      Share your experience and give some tips on what to bring
                      on your first time.
                    </p>
                    <Link to="/register">
                      <button className="btn btn-primary">Register</button>
                    </Link>
                  </div>
                  <div className="card-footer"></div>
                </div>
                <div className="card shadow">
                  <img src={altRoad} alt="..." className="card-img-top"></img>
                  <div className="card-body">
                    <h5 className="card-title">View the latest lists</h5>
                    <hr />
                    <p className="card-text">
                      Looking for inspiration? Try looking at the latest lists
                      our users have submitted. Check them out and start your
                      own!
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        Last updated 3 mins ago
                      </small>
                    </p>
                    <Link to="lists/latest-liked">
                      <button className="btn btn-primary">Take me there</button>
                    </Link>
                  </div>
                  <div className="card-footer"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Landing;
