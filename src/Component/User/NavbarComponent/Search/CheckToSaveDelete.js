import React, { useState, useEffect } from "react";
import axios from "axios";
import SaveSongUserPlayList from "../../SaveOrDelete/SaveSongUserPlayList";
import DeleteSongUserPlayList from "../../SaveOrDelete/DeleteSongUserPlayList";

function CheckToSaveDelete({ username, songname, artist, song_id }) {

  const [stateSave, setStateSave] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:5000/get/${username}/${song_id}`)
      .then((response) => {
        setStateSave(response.data.message);
      })
      .catch((error) => {
        console.log(error)
      });
  }, [username, song_id]);
  
  //console.log("")
  return (
    <div>
      {stateSave === "NotSaved" ? (
        <SaveSongUserPlayList
          username={username}
          songname={songname}
          artist={artist}
          song_id={song_id}
        />
      ) : (
        <DeleteSongUserPlayList
          username={username}
          song_id={song_id}
        />
      )}
    </div>
  );
}

export default CheckToSaveDelete;
