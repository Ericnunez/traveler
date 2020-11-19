import React, { Component } from "react";
import Table from "../table";
import { Link } from "react-router-dom";

class LikedListTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (list) => <Link to={`/view-list/${list.id}`}>{list.title}</Link>,
    },
    { path: "destination", label: "Destination" },
    { path: "description", label: "Description" },
    {
      key: "edit",
      content: (list) => (
        <button
          onClick={(e) => {
            this.props.onUnlike(list.id);
          }}
          className="btn btn-primary btn-sm"
        >
          Unlike
        </button>
      ),
      label: "",
    },
  ];

  render() {
    const { lists, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={lists}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default LikedListTable;
