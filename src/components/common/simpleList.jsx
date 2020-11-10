import React, { Component } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SimpleListTable from "./simpleListTable";
import { firestore } from "../../firebase/firebase";

class SimpleList extends Component {
  state = {
    lists: [],
    pageSize: 5,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    query: "",
    searchQuery: "",
  };

  componentDidMount() {
    this.setState({ lists: this.props.lists });
  }

  handleLike = (list) => {
    const lists = [...this.state.lists];
    const index = lists.indexOf(list);
    lists[index] = { ...lists[index] };
    lists[index].liked = !lists[index].liked;
    this.setState({ lists });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };
  handleDelete(listId) {
    firestore.collection("lists").doc(listId).delete();
    window.location.reload();
  }

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      lists: allLists,
      sortColumn,
      searchQuery,
    } = this.state;

    let filteredLists = allLists;

    if (searchQuery) {
      filteredLists = allLists.filter((list) =>
        list.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const sortedLists = _.orderBy(
      filteredLists,
      [sortColumn.path],
      [sortColumn.order]
    );

    const lists = paginate(sortedLists, currentPage, pageSize);

    return { totalCount: filteredLists.length, data: lists };
  };

  render() {
    const { pageSize, currentPage, sortColumn } = this.state;
    const { totalCount, data: lists } = this.getPageData();
    const list = totalCount > 1 ? "lists" : "list";

    // if (count === 0) return <p>There are no lists here</p>;

    return (
      <div className="container pt-4 list-table shadow">
        <div className="row">
          <div className="col">
            <p>
              You've made {totalCount} {list}, that's great!
            </p>
            <SimpleListTable
              sortColumn={sortColumn}
              lists={lists}
              onLike={this.handleLike}
              onDelete={this.props.delete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SimpleList;
