import React from "react";
import Form from "./form";
import LoadingIndicator from "../common/LoadingIndicator";
import Joi from "joi-browser";
import { timestamp, firestore, projectStorage } from "../../firebase/firebase";

class UpdateForm extends Form {
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
    imageFile: "",
    uploading: false,
    imageUploading: false,
    imagePreview: "",
  };

  componentDidMount() {
    const listId = this.props.match.params.id;
    if (!listId) {
      return this.props.history.replace("/not-found");
    }
    const getDocument = async (listId) => {
      try {
        const docRef = firestore.collection("lists").doc(listId);
        const doc = await docRef.get();
        if (doc.exists) {
          this.setState({ data: doc.data() });
        } else {
          return this.props.history.replace("/not-found");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    };
    getDocument(listId);
  }

  saveImageFile = async () => {
    const file = this.state.imageFile;
    if (file === "") return;
    this.setState({ imageUploading: true });
    const uid = localStorage.getItem("uid");
    let url = "";
    try {
      const storageRef = projectStorage.ref();
      const folderRef = storageRef.child(`images/${uid}/${file.name}`);
      const upload = await folderRef.put(file);
      const url = await folderRef.getDownloadURL();
      console.log(url, "image url");
      const listId = this.props.match.params.id;
      const ref = firestore.collection("lists").doc(listId);
      await ref.update({ image: url });
      this.props.history.go(0);
    } catch (error) {
      console.log("There was an error with the file upload", error);
    }
  };

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
    const listId = this.props.match.params.id;
    const data = this.state.data;
    try {
      const docRef = firestore.collection("lists").doc(listId);
      await docRef.update(data);
      this.props.history.push(`/view-list/${listId}`);
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
    const { uploading, imageUploading, imagePreview } = this.state;
    if (!this.props.user) {
      window.location = "/login";
    }
    return (
      <section className=" section-custom">
        {uploading ? (
          <LoadingIndicator />
        ) : (
          <React.Fragment>
            <div className="container mt-4 pt-4 pb-4 card shadow">
              <h1 className="display-5 text-center">Update your list!</h1>
              <hr />
              <form onSubmit={this.handleSubmit}>
                <div className="row ">
                  <div className="col col-sm ">
                    <div className="card-header-custom">
                      <div className="lead">The Details</div>
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
                    <div className="file-upload">
                      <div className="card-header-custom rounded ">
                        <div className="lead">Upload a new picture</div>
                      </div>
                      {imageUploading ? (
                        <LoadingIndicator />
                      ) : (
                        <React.Fragment>
                          <img
                            className="cover mb-2"
                            src={
                              imagePreview
                                ? imagePreview
                                : this.state.data.image
                            }
                            alt=""
                          />
                          <div className="d-flex mb-2">
                            <input
                              onChange={(event) => {
                                this.handleFileSelect(event);
                              }}
                              type="file"
                              accept="image/*"
                            />{" "}
                            <button
                              disabled={this.state.imageFile === ""}
                              onClick={(e) => {
                                e.preventDefault();
                                this.saveImageFile();
                              }}
                              className="btn btn-primary ml-auto"
                            >
                              Upload
                            </button>
                          </div>
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                  <div className="col-sm">
                    <div className="card-header-custom">
                      <div className="lead">The Essentials</div>
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
          </React.Fragment>
        )}
      </section>
    );
  }
}

export default UpdateForm;
