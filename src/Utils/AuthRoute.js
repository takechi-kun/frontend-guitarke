import React from "react";
import { Route , Redirect } from "react-router-dom";
import { getToken, getUser } from "./Common";
import AdminRoute from "./PrivateRoute/AdminRoute";
import UserRoute from "./PrivateRoute/UserRoute";

function AuthRoute({ ...rest }) {
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          return getToken() ? (
            getUser().roles === "Admin" ? (
              <AdminRoute {...props} />
            ) : (
              <UserRoute {...props} />
            )
          ) : (
            <Redirect to={{ pathname: "/homepage", state: { from: props.location } }} />
          );
        }}
      />
    </div>
  );
}

export default AuthRoute;
