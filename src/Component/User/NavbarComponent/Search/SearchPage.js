import axios from "axios";
import React, { useEffect, useState, useContext, Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import { getUser } from "../../../../Utils/Common";
import PaginationForSearch from "./PaginationForSearch";
import CheckToSaveDelete from "./CheckToSaveDelete";
import { GuitarKeContext } from "../../../../ContextAndReducer/ContextAndReducer";
function SearchPage() {
  const { result } = useContext(GuitarKeContext);
  const [searchFound, setSearchFound] = useState([]);
  const [message, setMessage] = useState();
  var user = getUser();
  const useQuery = () => new URLSearchParams(useLocation().search);
  let query = useQuery();
  let search = query.get("s");
  var history = useHistory();
  useEffect(() => {
    (async () => {
      try {
        const result = axios.get(
          `http://localhost:5000/search_songs/${search}`
        );
        result
          .then((response) => {
            setSearchFound(response.data);
            setMessage("found");
          })
          .catch((error) => {
            if (
              error.response.status === 404 ||
              error.response.status === 401 ||
              error.response.status === 400
            ) {
              setMessage(error.response.data.message);
            } else {
              setMessage("Something Wrong Please Try Again");
            }
          });
      } catch (error) {
        console.log(error);
      }
    })();
    document.title = `Search "${search}" | GuitarKe`;
  }, [search]);

  const currentShowSong = searchFound.slice(
    (result.page_num - 1) * 10,
    (result.page_num - 1) * 10 + 10
  );

  return (
    <Fragment>
      <Header />
      <div className="mx-72 mt-8 ">
        <p className="text-xl lg:text-3xl">"{search}" Search Result</p>
        <hr className="mt-8 mb-2" />
      </div>

      {message === "found" ? (
        <div className="flex flex-col items-center">
          {currentShowSong.map((value, index) => {
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
                <CheckToSaveDelete
                  username={user.username}
                  songname={value.songname}
                  artist={value.artist}
                  song_id={value.song_id}
                />
              </div>
            );
          })}
          <PaginationForSearch
            currentSearchSong={searchFound.length}
            postsPerPage={10}
          />
        </div>
      ) : (
        <div className="mx-32 mt-4 text-4xl">{message}</div>
      )}
    </Fragment>
  );
}

export default SearchPage;
