import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import PaginationSong from "../Pagination/PaginationSong";
import PostsSong from "./PostsSong";
import { GuitarKeContext } from "../../../ContextAndReducer/ContextAndReducer";
function TableSong() {
  const { result, dispatch } = useContext(GuitarKeContext);
  const [listSongs, setListSongs] = useState([]);
  const [searchSong, setSearchSong] = useState("");

  useEffect(() => {
    const getAllSongs = async () => {
      dispatch({ type: "loading" });
      const res = await axios.get("http://localhost:5000/getallsong_admin");
      setListSongs(res.data);
    };
    getAllSongs();
  }, [dispatch]);

  function FilterSearchSong(allsong) {
    const newFilter = allsong.filter((value) => {
      return (
        value.songname.toLowerCase().indexOf(searchSong.toLowerCase()) !== -1
      );
    });
    return newFilter;
  }

  // Get current posts
  const currentPostsSong = FilterSearchSong(listSongs).slice(
    (result.page_num - 1) * 10,
    (result.page_num - 1) * 10 + 10
  );

  return (
    <div>
      {result.loading ? (
        <div className="bg-white" />
      ) : (
        <div>
          <div className="flex items-center justify-between bg-gray-900 rounded-t-md">
            <span className="mx-4 my-2 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text text-2xl font-semibold">
              AllSong
            </span>
            <input
              type="text"
              className="outline-none mx-4 my-2 border border-gray-150 px-4 py-2 w-60 rounded-md sm:text-sm border-gray-300"
              placeholder="Search Song..."
              value={searchSong}
              onChange={(event) => {
                setSearchSong(event.target.value);
                dispatch({ type: "PAGE_NUM", payload: 1 });
              }}
            />
          </div>

          {currentPostsSong.length === 0 ? (
            <h2 className="bg-white p-4 text-center rounded-md">
              {`"${searchSong}"`} Not Founded
            </h2>
          ) : (
            <div>
              <PostsSong currentPostsSong={currentPostsSong} />
              <PaginationSong
                totalPostsSong={listSongs.length}
                postsPerPage={10}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default TableSong;
