import React, { Component } from "react";
import imagePlaceholder from "../../images/road.jpg";
import LikeButton from "./likeButton";
import {
  firestore,
  incrementLikes,
  checkIfUserLikedList,
  addUserToLikedList,
} from "../../firebase/firebase";
import shortid from "shortid";
import LikeCounter from "./LikeCounter";

class ViewList extends Component {
  constructor(props) {
    super(props);
    this.listId = this.props.match.params.id;
    if (!this.listId) window.location = "/not-found";
    this.docRef = firestore.collection("lists").doc(this.listId);
    this.checkIfListExists();
  }
  state = {
    data: null,
    itemArray: [],
    userLiked: false,
  };

  componentDidMount() {
    let listId = this.listId;
    const getDocument = async (listId) => {
      // const docRef = firestore.collection("lists").doc(listId);
      const response = await this.docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            return doc.data();
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document cdm!");
            return this.props.history.replace("/not-found");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
      this.setState({ data: response });
      this.mapDataToArray();
    };
    getDocument(listId);

    this.startListener();
    checkIfUserLikedList(listId, this.props.user.uid);
  }

  checkIfListExists = async () => {
    const response = await this.docRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document check!");
          window.location = "/not-found";
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  componentWillUnmount() {
    console.log("Viewlist has unmounted");
    this.holdUnsub();
  }

  holdUnsub() {}

  startListener() {
    const unsubscribe = this.docRef.onSnapshot((doc) => {
      this.updateList(doc.data());
    });
    this.holdUnsub = unsubscribe;
  }

  updateList(list) {
    this.setState({ data: list });
    this.mapDataToArray();
  }

  mapDataToArray() {
    const itemArr = [];
    for (let i = 1; i <= 10; i++) {
      itemArr.push(this.state.data["item" + i]);
    }
    this.setState({ itemArray: itemArr });
  }

  handleButtonClick = (event) => {
    incrementLikes(this.listId);
    addUserToLikedList(this.state.data.id, this.props.user.uid);
  };

  render() {
    const { data, itemArray, userLiked } = this.state;

    return (
      <React.Fragment>
        {data && (
          <section className="">
            <div className="container d-flex flex-column px-4">
              <h2 className="title text-center p-4">{data.title}</h2>
              <div className="row card flex-md-row mb-3 h-md-250 shadow p-4">
                <div className="col col-sm">
                  <div className="">
                    {this.state.data.image === "" ? (
                      <img
                        src={imagePlaceholder}
                        alt=""
                        className="cover"
                      ></img>
                    ) : (
                      <img src={data.image} alt="" className="cover"></img>
                    )}
                  </div>
                  <div className="d-flex align-items-center pt-2">
                    <h4 className="mt-1 pb-0 lead flex-grow-1">
                      {data.destination}
                    </h4>
                    {this.props.user ? (
                      <React.Fragment>
                        <LikeCounter likes={data.likedAmount} />
                        <LikeButton
                          handleClick={this.handleButtonClick}
                          status={data.liked}
                          enabled={!userLiked}
                        ></LikeButton>
                      </React.Fragment>
                    ) : (
                      <LikeCounter likes={data.likedAmount} />
                    )}
                  </div>
                  <hr className="mt-1" />
                  <p className="p-1">{data.description}</p>
                </div>
                <div className="col col-sm">
                  <table className="table table-viewlist table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="text-center" scope="col">
                          #
                        </th>
                        <th scope="col">Item</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemArray.map((item, index) => (
                        <tr key={item + shortid.generate()}>
                          <th className="text-center" scope="row">
                            {index + 1}
                          </th>
                          <td>{item}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}
      </React.Fragment>
    );
  }
}

export default ViewList;
