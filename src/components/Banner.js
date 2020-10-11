import React, { Component } from "react";

class Banner extends Component {
  render() {
    return (
      <div className="banner overflow-hidden text-center">
        <div className="banner-bg p-4">
          <div className="container position-relative p-4 p-md-5 text-white text-center">
            <div className=" px-0 ">
              <h1 className="display-4 ">Roadtripper</h1>
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
