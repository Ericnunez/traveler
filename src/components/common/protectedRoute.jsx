import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({
  path,
  component: Component,
  render,
  user,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user === null)
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
