import React, { useEffect, useContext, Fragment } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Header from "../NavbarComponent/Header/Header";
import { getUser } from "../../../Utils/Common";
import { FaList } from "react-icons/fa";
import { GuitarKeContext } from "../../../ContextAndReducer/ContextAndReducer";
function MainPage() {
  var user = getUser();
  var history = useHistory();
  const { result, dispatch } = useContext(GuitarKeContext);
  function PlaylistHandle() {
    history.push("/playlist");
  }
  useEffect(() => {
    axios
      .get(`http://localhost:5000/${user.username}/countplaylist`)
      .then((response) => {
        dispatch({
          type: "NUM_SONG_PLAYLIST",
          payload: response.data[0].countsong,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.username, dispatch]);
  return (
    <Fragment>
      <div className="bg-white w-screen h-screen">
        <Header />
        <div className="lg:mx-48 mt-8 ">
          <p className="ml-10 mt-10 font-medium text-2xl lg:text-4xl">
            Your Username : {user.username}
          </p>
          <hr className="mt-8" />
          <div className="flex lg:flex-row lg:justify-center items-center flex-col mt-8">
            <div className="rounded-lg bg-gray-100 hover:bg-gray-200 w-120 h-56">
              <button onClick={PlaylistHandle} className="m-8 py-8">
                <p className="text-5xl text-left flex flex-row">
                  <FaList className="mr-2" />
                  PlayList
                </p>
                <br />
                <p className="text-2xl text-left">
                  {result.count_song_playlist} Song
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default MainPage;
