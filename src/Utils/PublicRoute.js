import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "./Common";

function PublicRoute({ component: Component, ...rest }) {
  //console.log(rest)

  return (
    <Route
      {...rest}
      render={(props) => {
        //console.log(props)
        return !getToken() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/" , state: { from: props.location }}} />
          /*(getUser().roles = "User" ? (
            <Redirect to={{ pathname: "/" , state: { from: props.location }}} />
          ) : (
            <Redirect to={{ pathname: "/" , state: { from: props.location }}} />
          ))*/
        );
      }}
    />
  );
}

export default PublicRoute;
