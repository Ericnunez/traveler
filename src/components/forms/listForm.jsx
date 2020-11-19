import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import { timestamp, firestore, projectStorage } from "../../firebase/firebase";
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
    imageFile: "",
    imagePreview: "",
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

  handleFileSelect = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      this.setState({
        imageFile: file,
        imagePreview: URL.createObjectURL(event.target.files[0]),
      });
    } else {
      this.setState({ imageFile: "", imagePreview: "" });
    }
  };

  doSubmit = async () => {
    this.setState({ uploading: true });
    const newData = { ...this.state.data };
    const file = this.state.imageFile;
    const uid = localStorage.getItem("uid");

    try {
      const storageRef = projectStorage.ref();
      if (file) {
        const folderRef = storageRef.child(`images/${uid}/${file.name}`);
        await folderRef.put(file);
        const url = await folderRef.getDownloadURL();
        newData.image = url;
      }

      const doc = await firestore.collection("lists").add(newData);
      newData.id = doc.id;
      await firestore.collection("lists").doc(doc.id).update(newData);
      this.props.history.push(`/view-list/${doc.id}`);
      this.setState({ uploading: false });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
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
              <h1 className="display-5 text-center">
                Create a List...it can be anything
              </h1>
              <hr />
              <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col col-sm ">
                    <div className="card-header-custom">
                      <div className="lead">The details</div>
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
                    <React.Fragment>
                      <div className="file-upload">
                        <div className="card-header-custom mt-2 mb-2">
                          <div className="lead">
                            Make your list pop by adding a custom picture!{" "}
                          </div>
                          <p>
                            If you don't add one now, you can always add one
                            later.
                          </p>
                        </div>
                        {this.state.imagePreview && (
                          <img
                            className="cover mb-2"
                            src={this.state.imagePreview}
                            alt=""
                          />
                        )}
                        <input
                          className="mb-2"
                          onChange={(event) => {
                            this.handleFileSelect(event);
                          }}
                          type="file"
                          accept="image/*"
                        />
                      </div>
                    </React.Fragment>
                  </div>
                  <div className="col-sm">
                    <div className="card-header-custom">
                      <div className="lead">
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
