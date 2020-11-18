import React, { Component } from "react";
import SimpleList from "./simpleList";
import { firestore } from "../../firebase/firebase";
import UserCard from "./UserCard";

class ProfilePage extends Component {
  state = {};

  componentDidMount() {
    const uid = localStorage.getItem("uid");

    this.getUserLists(uid);
    this.getRandomFact();
  }

  getUserLists = async (uid) => {
    let listArray = [];

    try {
      const docRef = firestore.collection("lists");
      const data = await docRef.where("uid", "==", uid).get();
      data.forEach((doc) => {
        listArray.push(doc.data());
      });
      this.setState({ lists: listArray });
    } catch (error) {
      console.log("There was an error getting latest lists", error);
    }
  };

  deleteDocument = async (listId) => {
    await firestore.collection("lists").doc(listId).delete();
    this.props.history.go(0);
  };

  getRandomFact = async () => {
    try {
      const response = await fetch(
        "https://uselessfacts.jsph.pl/random.json?language=en"
      );
      const data = await response.json();
      this.setState({ randomFact: data.text });
    } catch (error) {
      console.log("There was an error getting the random fact", error);
    }
  };

  render() {
    const { user } = this.props;
    return (
      <section className="profile">
        <article className="container">
          <div className="row flex-md-row h-md-250 p-3">
            <UserCard
              height="100rem"
              width="100rem"
              displayName={user.displayName}
              email={user.email}
              profilePicture={user.photoURL}
            />
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
            </div>
          </div>
        </article>
      </section>
    );
  }
}

export default ProfilePage;
