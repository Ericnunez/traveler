import React, { Component } from "react";
import _ from "lodash";

class SimpleListTableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    if (column.path === "publishDate") {
      const time = _.get(item, column.path);
      return time.toDate().toString();
    }
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item.id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default SimpleListTableBody;
