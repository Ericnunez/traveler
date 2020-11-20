import React from "react";
import { useRef } from "react";

const ShareButton = () => {
  const url = useRef(null);
  return (
    <React.Fragment>
      <div
        className="modal fade"
        id="shareModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Share
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
            <div className="modal-body text-right">
              <input
                ref={url}
                type="email"
                className="form-control form-control-plaintext"
                id="url"
                aria-describedby="emailHelp"
                readOnly
                value={window.location.href}
              />
              <button
                type="button"
                className="btn btn-sm btn-outline-primary ml-auto mt-2"
                onClick={(event) => {
                  url.current.select();
                  document.execCommand("copy");
                }}
              >
                Copy
              </button>
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
      <h5
        className="ml-2"
        data-toggle="modal"
        data-target="#shareModal"
        role="button"
      >
        <i className="fas fa-share"></i>
      </h5>
    </React.Fragment>
  );
};

export default ShareButton;
