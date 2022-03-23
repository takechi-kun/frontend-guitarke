import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import PaginationUser from "../Pagination/PaginationUser";
import PostsUser from "./PostsUser";
import { GuitarKeContext } from "../../../ContextAndReducer/ContextAndReducer";
function TableUser() {
  const { result, dispatch } = useContext(GuitarKeContext);
  const [listUsers, setListUsers] = useState([]);
  const [searchUsername, setSearchUsername] = useState("");

  useEffect(() => {
    const getAllUser = async () => {
      dispatch({ type: "loading" });
      const res = await axios.get("http://localhost:5000/getalluser_admin");
      setListUsers(res.data);
    };
    getAllUser();
  }, [dispatch]);

  function FilterSearchUsername(alluser) {
    const newFilter = alluser.filter((value) => {
      return (
        value.username.toLowerCase().indexOf(searchUsername.toLowerCase()) !==
        -1
      );
    });
    return newFilter;
  }

  // Get current posts
  const currentPostsUsers = FilterSearchUsername(listUsers).slice(
    (result.page_num - 1) * 10,
    (result.page_num - 1) * 10 + 10
  );

  return (
    <div>
      {result.loading ? (
        <div className="bg-white" />
      ) : (
        <div>
          <div className="flex items-center justify-between bg-gray-900 rounded-t-md shadow-md">
            <span className="mx-4 my-2 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text text-2xl font-semibold">
              Alluser
            </span>
            <input
              type="text"
              className="outline-none mx-4 my-2 border border-gray-150 px-4 py-2 w-60 rounded-md sm:text-sm border-gray-300"
              placeholder="Search User..."
              value={searchUsername}
              onChange={(event) => {
                setSearchUsername(event.target.value);
                dispatch({ type: "PAGE_NUM", payload: 1 });
              }}
            />
          </div>

          {currentPostsUsers.length === 0 ? (
            <h2 className="bg-white p-4 text-center rounded-md">
              {`"${searchUsername}"`} Not Founded
            </h2>
          ) : (
            <div>
              <PostsUser
                currentPostsUsers={currentPostsUsers}
              />
              <PaginationUser
                totalPostsUser={listUsers.length}
                postsPerPage={10}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default TableUser;
