import React, { Component } from "react";

class Blog extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <div className="row align-items-end">
          <div className="col">
            <div className="form-signin card shadow">
              <h1 className="text-center">Roadtripper</h1>
              <form>
                <button>email</button>
                <button>password</button>
                <button>name</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Blog;
