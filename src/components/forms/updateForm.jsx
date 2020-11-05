import React from "react";
import Form from "./form";
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
    showFileUpload: false,
  };

  componentDidMount() {
    const listId = this.props.match.params.id;
    if (!listId) return this.props.history.replace("/not-found");
    const getDocument = async (listId) => {
      const docRef = firestore.collection("lists").doc(listId);
      const response = await docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            // console.log("Document data:", doc.data());
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
    };
    getDocument(listId);
  }

  saveImageFile = () => {
    const file = this.state.imageFile;
    let imageURL = "init";
    if (!file) return;
    const saveImage = async () => {
      const storageRef = projectStorage.ref();
      const folderRef = storageRef.child(
        "images/" + localStorage.getItem("uid") + "/" + file.name
      );
      const upload = folderRef.put(file);

      upload.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log("There was an error with the file upload", error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          upload.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            this.setState({ uploading: false });
            const newData = { ...this.state.data };
            newData.image = downloadURL;
            this.setState({ data: newData });
            imageURL = downloadURL;
          });
        }
      );
    };
    saveImage();

    const addImageToDocument = async () => {
      const listId = this.props.match.params.id;
      const ref = firestore.collection("lists").doc(listId);

      await ref
        .update({ image: imageURL })
        .then(function (doc) {})
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    };

    setTimeout(async () => {
      await addImageToDocument();
    }, 2500);
    this.setState({ showFileUpload: false, imageFile: null });
  };

  handleFileSelect = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      this.setState({ imageFile: file });
    }
    console.log(file);
  };

  mapListToState(list) {
    this.setState({ data: list });
  }

  doSubmit = () => {
    const listId = this.props.match.params.id;
    const data = this.state.data;

    const updateDocument = async (listId) => {
      const docRef = firestore.collection("lists").doc(listId);

      await docRef
        .update(data)
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    };
    updateDocument(listId);
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
    if (!this.props.user) {
      window.location = "/login";
    }
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
              <div className="modal-body">You just edited your list!</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location = "/";
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <section className=" section-custom">
          <div className="container mt-4 pt-4 pb-4 card shadow ">
            <h1 className="display-5 text-center pb-4">Update your list!</h1>
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
                  <button
                    data-dismiss="modal"
                    data-target="#addPicture"
                    //data-toggle="modal"
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({ showFileUpload: true });
                    }}
                  >
                    Add a Custom Picture
                  </button>
                  {this.state.showFileUpload && (
                    <React.Fragment>
                      <div className="card-header-custom mt-2 mb-2">
                        <div className="lead text-center">
                          Make your list pop!
                        </div>
                      </div>
                      <input
                        className="mb-2"
                        onChange={(event) => {
                          this.handleFileSelect(event);
                        }}
                        type="file"
                        accept="image/*"
                      />
                      {this.state.uploading && (
                        <div className="text-center">
                          <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      )}
                      {!this.state.uploading && (
                        <React.Fragment>
                          {" "}
                          <button
                            onClick={(e) => {
                              if (!this.state.imageFile) return;
                              e.preventDefault();
                              this.setState({ uploading: true });
                              this.saveImageFile();
                            }}
                            className="btn btn-primary mr-2"
                          >
                            Save File
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                            onClick={(e) => {
                              e.preventDefault();
                              this.setState({
                                imageFile: null,
                                showFileUpload: false,
                              });
                            }}
                          >
                            Cancel
                          </button>
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  )}
                  {this.state.uploading && (
                    <div className="text-center">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
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

export default UpdateForm;
