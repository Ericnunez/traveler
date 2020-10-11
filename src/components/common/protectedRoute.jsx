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
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;

// {(props) => {
//   if (!user)
//     return (
//       <Redirect
//         to={{
//           pathname: "/login",
//           state: { from: props.location },
//         }}
//       />
//     );
//   return Component ? <Component {...props} /> : render(props);
// }}
