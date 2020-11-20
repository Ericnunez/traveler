import React, { Component } from "react";
import SimpleList from "./simpleList";
import { firestore, getUserDocument } from "../../firebase/firebase";
import UserCard from "./UserCard";
import LikedLists from "./LikedLists/LikedLists";
import UserBio from "./UserBio/UserBio";

class ProfilePage extends Component {
  state = { showMyLists: true };

  data = {
    bio: "something here",
    location: "chicago",
    website: "google.com",
    twitterUsername: "blahblah",
    instagramUsername: "rice baby",
  };

  componentDidMount() {
    const uid = localStorage.getItem("uid");

    this.getUserLists(uid);
    this.getRandomFact();
    this.getLikedLists();
    getUserDocument(uid).then((res) => {
      this.setState({ user: res });
    });
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

  getLikedLists = async () => {
    const uid = localStorage.getItem("uid");
    const array = [];
    const arr = [];

    try {
      const docRef = await firestore.collection("likes").doc(uid).get();
      const allLikes = docRef.data();
      for (const key of Object.keys(allLikes)) {
        array.push(key);
      }
      const ref = firestore.collection("lists");
      const list = await ref.where("id", "in", array).get();
      list.forEach((doc) => {
        arr.push(doc.data());
      });
      this.setState({ likedLists: arr });
    } catch (error) {
      console.log("There was an error getting liked lists", error);
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
    const { user } = this.state;
    return (
      <section className="profile">
        <article className="container">
          <div className="row flex-md-row h-md-250 p-3">
            {this.state.user && (
              <UserCard
                height="100rem"
                width="100rem"
                displayName={this.state.user.displayName}
                email={this.state.user.email}
                profilePicture={this.state.user.photoURL}
              />
            )}
          </div>
          <hr className="mt-0" />
          <div className="row profile-page-lower">
            <div className="col-md-3 user-bio mb-2">
              {this.state.user && <UserBio data={this.state.user} />}
              <hr />
              <div className="mb-3">
                <div className="card-title">Random Fact</div>
                <p className="card-text">{this.state.randomFact}</p>

                <p className="card-text">
                  <small className="text-muted">
                    Facts provided by: uselessfacts.jsph.pl
                  </small>
                </p>
              </div>
            </div>
            <div className="col-md-9">
              <ul className="nav nav-tabs nav-fill mb-3" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#myLists"
                    role="tab"
                    aria-controls="myLists"
                    onClick={() => {
                      this.setState({ showMyLists: true });
                    }}
                  >
                    My Lists
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    role="tab"
                    href="#likedLists"
                    aria-controls="likedLists"
                    onClick={() => {
                      this.setState({ showMyLists: false });
                    }}
                  >
                    Liked Lists
                  </a>
                </li>
              </ul>
              <React.Fragment>
                {this.state.lists && this.state.showMyLists && (
                  <React.Fragment>
                    <SimpleList
                      lists={this.state.lists}
                      user={user}
                      delete={this.deleteDocument}
                    />
                  </React.Fragment>
                )}
                {this.state.likedLists && !this.state.showMyLists && (
                  <LikedLists
                    lists={this.state.likedLists}
                    user={user}
                    delete={this.deleteDocument}
                  />
                )}
              </React.Fragment>
            </div>
          </div>
        </article>
      </section>
    );
  }
}

export default ProfilePage;
