import React, { Component } from "react";
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import _ from "lodash";
import ListTable from "./common/listTable";
import SearchBox from "./common/searchBox";
import { firestore } from "../firebase/firebase";

class Lists extends Component {
  state = {
    lists: [],
    pageSize: 10,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    query: "",
    searchQuery: "",
  };

  componentDidMount() {
    const listId = this.props.match.params.id;
    let orderByValue = "publishDate";
    console.log(listId);
    let listArray = [];
    const loadSortedLists = async () => {
      const docRef = firestore.collection("lists");
      await docRef
        .orderBy(orderByValue)
        .limit(5)
        .get()
        .then(function (snapshot) {
          snapshot.forEach((doc) => {
            listArray.push({ ...doc.data(), id: doc.id });
          });
        })
        .catch((error) => {
          console.log("There was an error getting latest lists", error);
        });
      this.setState({ lists: listArray });
    };

    const postData = [];
    const getDocuments = async () => {
      await firestore
        .collection("lists")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            postData.push({ ...doc.data(), id: doc.id });
          });
        })
        .catch((error) => {
          console.log("Error getting documents:", error);
        });
      this.setState({ lists: postData });
    };
    if (listId === "most-liked") {
      console.log(listId);
      orderByValue = "likedAmount";
      loadSortedLists();
    } else if (listId === "latest-liked") {
      loadSortedLists();
    } else {
      getDocuments();
    }
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

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
    const { length: count } = this.state.lists;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There are no lists here!</p>;

    const { totalCount, data: lists } = this.getPageData();
    return (
      <section className="section">
        <div className="container pt-3 list-table shadow">
          <div className="row">
            <div className="col">
              <p className="lead">
                Showing {totalCount} total lists, have fun!
              </p>
              <SearchBox
                value={searchQuery}
                onChange={this.handleSearch}
              ></SearchBox>
              <ListTable
                sortColumn={sortColumn}
                lists={lists}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
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
      </section>
    );
  }
}

export default Lists;
