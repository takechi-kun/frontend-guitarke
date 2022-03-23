import React, { Suspense, useEffect, useState, useReducer } from "react";
import "./css_scrollbar.css";
import "./HideArrowNumber.css";
import axios from "axios";
import { BrowserRouter, Switch } from "react-router-dom";
import { setUserSession, removeUserSession, getToken, getUser } from "./Utils/Common";
import AuthRoute from "./Utils/AuthRoute";
import PublicRoute from "./Utils/PublicRoute";
import {
  GuitarKeContext,
  positionNum,
  reducer,
} from "./ContextAndReducer/ContextAndReducer";

const HomePage = React.lazy(() => import("./Component/UnAuth/HomePage"));
const VerifyEmail = React.lazy(() =>
  import("./Component/UnAuth/VerifyEmail/VerifyEmail")
);
const ForgotPassword = React.lazy(() =>
  import("./Component/UnAuth/ForgotPassword/ForgotPassword")
);

function App() {
  const [loading, setLoading] = useState(true);
  const [result, dispatch] = useReducer(reducer, positionNum);
  useEffect(() => {
    const token = getToken();
    const user = getUser();
    if (!token || !user) {
      return;
    } else {
      axios
        .get(`http://localhost:5000/verifyToken?token=${token}`)
        .then((response) => {
          setLoading(false);
          setUserSession(response.data.token, response.data.user);
        })
        .catch((error) => {
          removeUserSession();
          setLoading(false);
          console.log(error);
        });
    }
  }, []);
  if (loading && getToken()) {
    return <div className="bg-white" />;
  }

  return (
    <BrowserRouter forceRefresh={true}>
      <GuitarKeContext.Provider value={{ result, dispatch }}>
        <Suspense fallback={<div className="bg-white" />}>
          <Switch>
            <PublicRoute exact path={"/homepage"} component={HomePage} />
            <PublicRoute
              path={"/verify_email/confirm/:user_id/:token"}
              component={VerifyEmail}
            />
            <PublicRoute path={"/forgotpassword"} component={ForgotPassword} />
            <AuthRoute />
          </Switch>
        </Suspense>
      </GuitarKeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
