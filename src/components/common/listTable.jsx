import React, { Component } from "react";
import Table from "./table";
import { Link } from "react-router-dom";

class ListTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (list) => <Link to={`/view-list/${list.id}`}>{list.title}</Link>,
    },
    { path: "destination", label: "Destination" },
    { path: "description", label: "Description" },
    { path: "publishDate", label: "Date" },
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

export default ListTable;
