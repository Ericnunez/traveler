import React, { Component } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Landing from "./components/landing";
import Lists from "./components/lists";
import Register from "./components/register";
import NotFound from "./components/notFound";
import Navbar from "./components/Navbar";
import ListForm from "./components/forms/listForm";
import Login from "./components/login";
import Footer from "./components/Footer";
import ViewList from "./components/common/viewList";
import ProfilePage from "./components/common/profilePage";
import { auth } from "./firebase/firebase";
import ProtectedRoute from "./components/common/protectedRoute";
import UpdateForm from "./components/forms/updateForm";
import About from "./components/about";
import ViewListFunc from "./components/common/ViewListFunc";

class App extends Component {
  state = { user: {} };

  componentDidMount() {
    this.authListener();
  }

  authListener = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        this.setState({ user });
        const idToken = await user.getIdToken();
        localStorage.setItem("token", idToken);
        localStorage.setItem("uid", user.uid);
        localStorage.setItem("email", user.email);
        localStorage.setItem("displayName", user.displayName);
      } else {
        this.setState({ user: null });
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <Navbar user={this.state.user}></Navbar>
        <main className="d-flex flex-column">
          <Switch>
            <Route path="/lists/:id?" component={Lists}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/home" component={Landing}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/about" component={About}></Route>
            <Route
              path="/view-list/:id"
              render={(props) => (
                <ViewListFunc {...props} user={this.state.user} />
              )}
            />
            {/* <Route
              path="/view-listfunc/:id"
              render={(props) => (
                <ViewListFunc {...props} user={this.state.user} />
              )}
            /> */}
            <Route
              path="/profile-page"
              render={(props) => (
                <ProfilePage {...props} user={this.state.user} />
              )}
            />
            <Route
              path="/update-list/:id"
              render={(props) => (
                <UpdateForm {...props} user={this.state.user} />
              )}
            />
            <ProtectedRoute
              path="/create-list/:id"
              component={ListForm}
              user={this.state.user}
            />
            <Redirect from="/" exact to="/home"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
          <Footer />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
