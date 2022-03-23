import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

const Dashboard = React.lazy(() => import("../../Component/Admin/Dashboard"));
const AllSongs = React.lazy(() =>
  import("../../Component/Admin/Songs/AllSongs")
);
const AllUsers = React.lazy(() =>
  import("../../Component/Admin/Users/AllUsers")
);
const AddSong = React.lazy(() =>
  import("../../Component/Admin/AddSong/AddSong")
);
const EditSong = React.lazy(() =>
  import("../../Component/Admin/EditSong/EditSong")
);
function AdminRoute() {
  return (
    <Switch>
      <Route exact path={`/`} component={Dashboard} />
      <Route exact path={`/allsong`} component={AllSongs} />
      <Route exact path={`/alluser`} component={AllUsers} />
      <Route exact path={`/addsong`} component={AddSong} />
      <Route exact path={`/edit_song/:song_id`} component={EditSong} />
      <Route exact path={`*`}>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default AdminRoute;
