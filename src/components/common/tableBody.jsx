import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    if (column.path === "publishDate") {
      const time = _.get(item, column.path);
      const timeArray = time.toDate().toString().split(" ");
      return _.dropRight(timeArray, 4).join(" ");
    }
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item.id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;
    const truncate = "table-ellipse";

    return (
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td
                className={` ${column.path === "description" ? truncate : ""}`}
                key={this.createKey(item, column)}
              >
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
