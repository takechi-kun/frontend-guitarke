import React from "react";
import { GuitarKeContext } from "../../../ContextAndReducer/ContextAndReducer";
const PaginationUser = ({ totalPostsUser, postsPerPage }) => {
  const { result, dispatch } = React.useContext(GuitarKeContext);
  let pattern = [];
  var range_page = Math.ceil(totalPostsUser / postsPerPage);

  if (range_page <= 5) {
    for (var i = 0; i < range_page; i++) {
      pattern.push(i + 1);
    }
  } else if (range_page > 5) {
    switch (true) {
      case result.page_num < 3:
        pattern = [1, 2, 3, 4, "...", range_page - 1];
        break;
      // almost last page or last page e.g. rangepage=12 currentpage=10
      case result.page_num > range_page - 4:
        pattern = [
          1,
          "...",
          range_page - 3,
          range_page - 2,
          range_page - 1,
          range_page,
        ];
        break;
      default:
        pattern = [
          1,
          "...",
          result.page_num - 1,
          result.page_num,
          result.page_num + 1,
          "...",
          range_page,
        ];
        break;
    }
  }

  function changeNumber(n) {
    if (typeof n === "number" && n >= 1 && n <= range_page) {
      dispatch({ type: "PAGE_NUM", payload: n})
    }
  }

  return (
    <div className="bg-gray-700 rounded-b-md flex justify-end px-5 py-1">
      <button
        disabled={result.page_num <= 1}
        onClick={() => changeNumber(result.page_num - 1)}
        className={
          result.page_num <= 1
            ? "rounded-l-md border border-gray-150 cursor-text bg-white text-gray-500 items-center px-4 py-2"
            : "rounded-l-md border border-gray-150 bg-white text-gray-500 hover:bg-red-400 items-center px-4 py-2"
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
                ? "border border-indigo-600 cursor-text bg-indigo-200 text-indigo-600 px-4 py-2  "
                : "border border-gray-150 px-4 py-2 text-gray-700 bg-white hover:bg-blue-700 hover:text-white "
              : "border border-gray-150 cursor-text bg-white text-gray-700 px-4 py-2"
          }
        >
          {number}
        </button>
      ))}

      <button
        disabled={result.page_num >= range_page}
        onClick={() => changeNumber(result.page_num + 1)}
        className={
          result.page_num >= range_page
            ? "rounded-r-md border border-gray-150 cursor-text bg-white text-gray-500 items-center px-4 py-2"
            : "rounded-r-md border border-gray-150 bg-white text-gray-500 hover:bg-green-400 items-center px-4 py-2"
        }
      >
        Next
      </button>
    </div>
  );
};

export default PaginationUser;
