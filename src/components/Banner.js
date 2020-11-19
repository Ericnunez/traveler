import React, { Component } from "react";

class Banner extends Component {
  render() {
    return (
      <div className="banner overflow-hidden">
        <div className="banner-bg p-4">
          <div className="container position-relative p-4 p-md-5 text-white">
            <div>
              <h1 className="display-4 text-center">Find your road..</h1>
              <p className="lead">
                A site to share your experiences and essentials. Share the best
                things that you took with you on a trip. Share that information
                with others so that they too can have a great trip!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;
