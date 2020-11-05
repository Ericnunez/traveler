import React, { Component } from "react";
import imagePlaceholder from "../../images/road.jpg";
import LikeButton from "./likeButton";
import { firestore, incrementLikes } from "../../firebase/firebase";

class ViewList extends Component {
  constructor(props) {
    super(props);
    this.listId = this.props.match.params.id;
    if (!this.listId) return this.props.history.replace("/not-found");
    this.docRef = firestore.collection("lists").doc(this.listId);
  }
  state = {
    data: {},
    itemArray: [],
  };

  componentDidMount() {
    // const listId = this.props.match.params.id;
    // if (!listId) return this.props.history.replace("/not-found");
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
            console.log("No such document!");
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
  }

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
  };

  render() {
    const { data, itemArray } = this.state;

    return (
      <section className="">
        <div className="container d-flex flex-column px-4">
          <h2 className="title text-center p-3">{data.title}</h2>

          <div className="row card flex-md-row mb-3 h-md-250 shadow p-4">
            <div className="col col-sm">
              <div className="">
                {this.state.data.image === "" ? (
                  <img src={imagePlaceholder} alt="" className="cover"></img>
                ) : (
                  <img src={data.image} alt="" className="cover"></img>
                )}
              </div>
              <div className="d-flex pt-2">
                <h4 className="mt-1 pb-0 lead flex-grow-1">
                  {data.destination}
                </h4>
                <span className="  mr-2 text-center">{data.likedAmount}</span>
                <LikeButton
                  handleClick={this.handleButtonClick}
                  status={data.liked}
                ></LikeButton>
              </div>

              <hr className="mb-0" />
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
                    <tr key={item + Math.floor(Math.random() * 101)}>
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
    );
  }
}

export default ViewList;
