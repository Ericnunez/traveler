import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import { timestamp, firestore } from "../../firebase/firebase";
import LoadingIndicator from "../common/LoadingIndicator";

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
    uploading: false,
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

  doSubmit = async () => {
    this.setState({ uploading: true });
    const data = this.state.data;

    const saveList = async () => {
      await firestore
        .collection("lists")
        .add(data)
        .then((docRef) => {
          const docReff = firestore.collection("lists").doc(docRef.id);
          docReff
            .update({ id: docRef.id })
            .then((doc) => {
              console.log("Document updated: ", doc);
              window.location = "/lists";
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    };
    saveList();
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
    const { uploading } = this.state;
    return (
      <React.Fragment>
        {uploading ? (
          <div className="d-flex h-100 justify-content-center align-items-center">
            <LoadingIndicator />
          </div>
        ) : (
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
        )}
      </React.Fragment>
    );
  }
}

export default ListForm;
