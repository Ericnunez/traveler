import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <React.Fragment>
      <div className="input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fa fa-search"></i>
          </div>
        </div>
        <input
          onChange={(event) => onChange(event.currentTarget.value)}
          name="query"
          type="text"
          value={value}
          placeholder={"Search..."}
          className="form-control"
        />
      </div>
    </React.Fragment>
  );
};

export default SearchBox;
