import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

const MainPage = React.lazy(() =>
  import("../../Component/User/MainPage/MainPage")
);
const Profile = React.lazy(() =>
  import("../../Component/User/Profile/Profile")
);
const Playlist = React.lazy(() =>
  import("../../Component/User/Playlist/Playlist")
);
const UpdatePassword = React.lazy(() =>
  import("../../Component/User/UpdatePassword/UpdatePassword")
);
const KaraokePage = React.lazy(() =>
  import("../../Component/User/Karaoke/KaraokePage")
);
const SearchPage = React.lazy(() =>
  import("../../Component/User/NavbarComponent/Search/SearchPage")
);
function UserRoute() {
  return (
    <Switch>
      <Route exact path={`/`} component={MainPage} />
      <Route exact path={`/profile`} component={Profile} />
      <Route exact path={`/playlist`} component={Playlist} />
      <Route exact path={`/update_password`} component={UpdatePassword} />
      <Route
        exact
        path={`/:get_songname-:get_artist`}
        component={KaraokePage}
      />
      <Route exact path={`/search`} component={SearchPage} />
      <Route exact path={`*`}>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default UserRoute;
