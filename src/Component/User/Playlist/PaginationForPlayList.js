import React, { useContext } from "react";
import { GuitarKeContext } from "../../../ContextAndReducer/ContextAndReducer";
function PaginationForPlayList ({currentPlayListSong,postsPerPage}) {
  const { result, dispatch } = useContext(GuitarKeContext);
  let pattern = [];
  var range = Math.ceil(currentPlayListSong / postsPerPage);
  if (range <= 5) {
    for (var i = 0; i < range; i++) {
      pattern.push(i + 1);
    }
  } else if (range > 5) {
    switch (true) {
      case result.page_num < 3:
        pattern = [1, 2, 3, 4, "...", range - 1];
        break;
      case result.page_num > range - 4:
        pattern = [1, "...", range - 3, range - 2, range - 1, range];
        break;
      default:
        pattern = [
          1,
          "...",
          result.page_num - 1,
          result.page_num,
          result.page_num + 1,
          "...",
          range,
        ];
        break;
    }
  }

  function changeNumber(n) {
    if (typeof n === "number" && n > 0 && n <= range) {
      dispatch({ type: "PAGE_NUM", payload: n})
    }
  }
  
  return (
    <nav className="my-4">
      <div>
        <button
          disabled={result.page_num <= 1}
          onClick={() => changeNumber(result.page_num - 1)}
          className={
            result.page_num <= 1
              ? "rounded-l-md border border-gray-150  cursor-text bg-white text-gray-500   items-center px-4 py-2"
              : "rounded-l-md border border-gray-150 bg-white  text-gray-500 hover:bg-red-400   items-center px-4 py-2 "
          }
        >
          Prev
        </button>
        {pattern.map((number) => (
          <button
            key={number}
            onClick={() => changeNumber(number)}
            className={
              typeof number === "number"
                ? result.page_num === number
                  ? "border  border-indigo-600 cursor-text  bg-indigo-200 text-indigo-600 px-4 py-2  "
                  : "border border-gray-150 px-4 py-2 text-gray-700 bg-white hover:bg-blue-700 hover:text-white "
                : "border border-gray-150 cursor-text bg-white text-gray-700 px-4 py-2"
            }
          >
            {number}
          </button>
        ))}

        <button
          disabled={result.page_num >= range}
          onClick={() => changeNumber(result.page_num + 1)}
          className={
            result.page_num >= range
              ? "rounded-r-md border border-gray-150  cursor-text bg-white text-gray-500   items-center px-4 py-2"
              : "rounded-r-md border border-gray-150 bg-white  text-gray-500 hover:bg-green-400   items-center px-4 py-2 "
          }
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default PaginationForPlayList;
