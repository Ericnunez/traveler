import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import { timestamp, firestore } from "../../firebase/firebase";

class ListForm extends Form {
  state = {
    data: {
      id: "",
      uid: "",
      title: "",
      description: "",
      destination: "",
      image: "",
      item1: "",
      item2: "",
      item3: "",
      item4: "",
      item5: "",
      item6: "",
      item7: "",
      item8: "",
      item9: "",
      item10: "",
      publishDate: timestamp(),
      liked: false,
      likedAmount: 0,
    },
    errors: {},
    editing: false,
  };

  componentDidMount() {
    const listId = this.props.match.params.id;
    if (!listId === "new") return this.props.history.replace("/not-found");

    const uid = localStorage.getItem("uid");
    if (uid) {
      const obj = this.state.data;
      obj.uid = uid;
      this.setState({ data: obj });
    }
  }

  mapListToState(list) {
    this.setState({ data: list });
  }

  doSubmit = () => {
    const data = this.state.data;
    let uploadedListId = "";

    const saveList = async () => {
      await firestore
        .collection("lists")
        .add(data)
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
          uploadedListId = docRef.id;
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    };

    saveList();
    console.log(uploadedListId);
    const addListId = (uploadedListId) => {
      const updateDocument = async (uploadedListId) => {
        const docRef = firestore.collection("lists").doc(uploadedListId);
        await docRef
          .update({ id: uploadedListId })
          .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
      };
    };
    addListId(uploadedListId);
  };

  schema = {
    id: Joi.optional().allow(""),
    uid: Joi.string().optional().allow(""),
    title: Joi.string().required().label("Title"),
    description: Joi.string().required().label("Description"),
    destination: Joi.string().required().label("Destination"),
    image: Joi.string().optional().allow(""),
    item1: Joi.string().required().label("Item 1"),
    item2: Joi.string().required().label("Item 2"),
    item3: Joi.string().required().label("Item 3"),
    item4: Joi.string().required().label("Item 4"),
    item5: Joi.string().required().label("Item 5"),
    item6: Joi.string().required().label("Item 6"),
    item7: Joi.string().required().label("Item 7"),
    item8: Joi.string().required().label("Item 8"),
    item9: Joi.string().required().label("Item 9"),
    item10: Joi.string().required().label("Item 10"),
    publishDate: Joi.optional().allow(""),
    liked: Joi.boolean().optional().allow(""),
    likedAmount: Joi.number().optional().allow(""),
  };

  render() {
    return (
      <React.Fragment>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  RoadTripper
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">Thanks for creating a list!</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location = "/lists";
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <section className="">
          <div className="container mt-4 pt-4 pb-4 card shadow ">
            <h1 className="display-5 text-center pb-4">
              Create a List...it can be anything
            </h1>
            <form onSubmit={this.handleSubmit}>
              <div className="row ">
                <div className="col col-sm ">
                  <div className="card-header-custom">
                    <div className="lead text-center">
                      Use these fields to say where this list was meant for.
                    </div>
                  </div>

                  {this.renderInput(
                    "title",
                    "Title",
                    "Enter a title for your list"
                  )}
                  {this.renderInput(
                    "destination",
                    "Destination",
                    "Destination"
                  )}
                  {this.renderTextArea(
                    "description",
                    "Description",
                    "Give a description for where you're going to use this list, write as much or as little as you want..."
                  )}
                </div>
                <div className="col-sm">
                  <div className="card-header-custom">
                    <div className="lead text-center">
                      Think about what your Top 10 items would be.
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      {this.renderInput("item1", "Item 1")}
                      {this.renderInput("item2", "Item 2")}
                      {this.renderInput("item3", "Item 3")}
                      {this.renderInput("item4", "Item 4")}
                      {this.renderInput("item5", "Item 5")}
                      {this.renderListFormButton("Save")}
                    </div>
                    <div className="col">
                      {this.renderInput("item6", "Item 6")}
                      {this.renderInput("item7", "Item 7")}
                      {this.renderInput("item8", "Item 8")}
                      {this.renderInput("item9", "Item 9")}
                      {this.renderInput("item10", "Item 10")}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default ListForm;
