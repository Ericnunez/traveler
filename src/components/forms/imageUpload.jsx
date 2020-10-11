import React from "react";
import { motion } from "framer-motion";

const ImageUpload = (props) => {
  return (
    <React.Fragment>
      <motion.div
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
        exit={{ x: -300, opacity: 0 }}
        className="image-upload-container"
      >
        <div className="card-header-custom">
          <div className="lead text-center">
            You can optionally add a custom picture to add to your list.
          </div>
        </div>
        {props.imageError && (
          <div className="alert alert-danger mt-1">{props.imageError}</div>
        )}
        <div className="input-group input-group-lg">
          <input
            type="file"
            className="form-control"
            aria-label="choose-file"
            aria-describedby="file-upload"
            onChange={props.handleFileChange}
          />
        </div>
        <div className="p-2">
          <button className="btn btn-primary mr-2">Upload</button>
          <button className="btn btn-secondary" onClick={props.hideFileUpload}>
            No Thanks
          </button>
        </div>
      </motion.div>
    </React.Fragment>
  );
};

export default ImageUpload;
