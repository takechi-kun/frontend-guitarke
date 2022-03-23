import React, { useState, useEffect, useContext, Fragment } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { getUser } from "../../../Utils/Common";
import Header from "../NavbarComponent/Header/Header";
import DeleteSongUserPlayList from "../SaveOrDelete/DeleteSongUserPlayList";
import PaginationForPlayList from "./PaginationForPlayList";
import { GuitarKeContext } from "../../../ContextAndReducer/ContextAndReducer";
function Playlist() {
  var user = getUser();
  var history = useHistory();
  const { result, dispatch } = useContext(GuitarKeContext);
  const [playlist, setPlaylist] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/${user.username}/getplaylist`)
      .then((response) => {
        setPlaylist(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:5000/${user.username}/countplaylist`)
      .then((response) => {
        dispatch({ type: "NUM_SONG_PLAYLIST", payload: response.data[0].countsong})
      })
      .catch((error) => {
        console.log(error);
      });
    document.title = `Playlist | GuitarKe`;
  }, [user.username, dispatch]);

  const currentPlayListSong = playlist.slice(
    (result.page_num - 1) * 10,
    (result.page_num - 1) * 10 + 10
  );

  return (
    <Fragment>
      <Header />
      <div className="mx-72 mt-8 ">
        <p className="text-xl lg:text-3xl">Playlist</p>
        <hr className="mt-8 mb-2" />
      </div>

      {result.count_song_playlist === 0 ? (
        <div className="mt-2 flex flex-col items-center">
          "You don't have a song in your playlist."
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {currentPlayListSong.map((value, index) => {
            return (
              <div
                key={index}
                className="flex flex-row items-center justify-between bg-gray-100 hover:bg:gray-200 my-2 p-5 w-150 rounded-md"
              >
                <button
                  onClick={() =>
                    history.push(`/${value.songname}-${value.artist}`)
                  }
                >
                  <span className="hover:underline">
                    {value.songname} - {value.artist}
                  </span>
                </button>

                <DeleteSongUserPlayList
                  username={user.username}
                  song_id={value.song_id}
                />
              </div>
            );
          })}
          <PaginationForPlayList
            currentPlayListSong={playlist.length}
            postsPerPage={10}
          />
        </div>
      )}
    </Fragment>
  );
}
export default Playlist;
