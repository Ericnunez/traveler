import React, { Component } from "react";
import Table from "./table";
import { Link } from "react-router-dom";

class SimpleListTable extends Component {
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
        <Link to={`/update-list/${list.id}`}>
          <button className="btn btn-primary btn-sm">Edit</button>
        </Link>
      ),
      label: "Edit",
    },
    {
      key: "delete",
      content: (list) => (
        <button
          onClick={() => this.props.onDelete(list.id)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
      label: "Delete",
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

export default SimpleListTable;
