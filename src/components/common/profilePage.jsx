import React, { Component } from "react";
import profilePicture from "../../images/profile-picture.png";
import SimpleList from "./simpleList";
import { firestore } from "../../firebase/firebase";

class ProfilePage extends Component {
  state = {};

  componentDidMount() {
    const uid = localStorage.getItem("uid");

    this.getUserLists(uid);
    this.getRandomFact();
  }

  getUserLists(uid) {
    let listArray = [];
    const loadLatestLists = async (uid) => {
      const docRef = firestore.collection("lists");
      await docRef
        .where("uid", "==", uid)
        .get()
        .then(function (snapshot) {
          snapshot.forEach((doc) => {
            listArray.push({ ...doc.data(), id: doc.id });
          });
        })
        .catch((error) => {
          console.log("There was an error getting latest lists", error);
        });
      this.setState({ lists: listArray });
    };
    loadLatestLists(uid);
  }

  deleteDocument(listId) {
    firestore.collection("lists").doc(listId).delete();
    setTimeout(function () {
      window.location.reload();
    }, 2500);
  }

  getRandomFact() {
    fetch("https://uselessfacts.jsph.pl/random.json?language=en", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ randomFact: data.text });
      })
      .catch((error) => {
        console.log("There was an error getting the random fact", error);
      });
  }

  render() {
    const { user } = this.props;
    return (
      <section className="profile">
        <article className="container p-5">
          <div className="row flex-md-row h-md-250 p-3">
            <div className="d-flex justify-content-center flex-wrap">
              <img
                src={profilePicture}
                alt="profile"
                height="100rem"
                width="100rem"
                className="ml-4"
              ></img>
              <article className="d-flex justify-content-center">
                <div className="profile-user-details p-3">
                  <h5 className="">{user.displayName}</h5>
                  {user.email && <h6>{user.email}</h6>}
                  <strong className="roadtripper">
                    RoadTripper Contributer
                  </strong>
                  <strong>{}</strong>
                </div>
              </article>
            </div>
          </div>
          <hr className="mt-0" />
          <div className="row profile-page-lower">
            <div className="col-md-3">
              <div className="card shadow mb-3">
                <div className="card-header">
                  Random Fact - Because why not?
                </div>
                <div className="card-body">
                  <p className="card-text">{this.state.randomFact}</p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">
                    Facts provided by: uselessfacts.jsph.pl
                  </small>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <ul className="nav nav-tabs nav-fill mb-3 " role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#projects"
                    role="tab"
                    aria-controls="projects"
                    aria-selected="true"
                  >
                    My Lists
                  </a>
                </li>
              </ul>
              {this.state.lists && (
                <SimpleList
                  lists={this.state.lists}
                  user={user}
                  delete={this.deleteDocument}
                />
              )}
              {/* TODO: Add functionality for getting this users liked lists */}
            </div>
          </div>
        </article>
      </section>
    );
  }
}

export default ProfilePage;
