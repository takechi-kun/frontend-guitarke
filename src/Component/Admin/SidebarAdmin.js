import React, { useState } from "react";
import { FaSignOutAlt, FaPlusCircle, FaUsers, FaList, FaRegWindowClose, FaMusic  } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { useHistory} from "react-router-dom";
import {  removeUserSession } from "../../Utils/Common"
function SidebarAdmin() {
  let history = useHistory();


  function handleAllSongs() {
    history.push("/allsong");
  }
  function handleAllUsers() {
    history.push("/alluser");
  }
  function handleAddSong() {
    history.push("/addsong");
  }
  function handleSignOut(){
    removeUserSession();
    history.push("/homepage");
  }
  const [collapseShow, setCollapseShow] = useState("hidden");
  return (

      <nav className="lg:left-0 lg:block lg:fixed lg:top-0 lg:bottom-0 lg:overflow-y-auto lg:flex-row lg:flex-nowrap lg:overflow-hidden shadow-xl bg-gray-900 flex flex-wrap items-center justify-between relative lg:w-64 z-10 py-4 px-6">
        <div className="lg:flex-col lg:items-stretch lg:min-h-full lg:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">

          <button
            className="cursor-pointer text-black opacity-50 lg:hidden px-4 py-2 text-2xl leading-none border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-gray-900 m-2 py-3 px-6")}
          >
            <FaList className="text-white" />
          </button>

          <div
            className={
              "lg:flex lg:flex-col lg:items-stretch lg:opacity-100 lg:relative lg:mt-4 lg:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            <div className="lg:min-w-full  block pb-4 mb-4">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <div className="flex items-center mt-4   text-gray-500">
                    <RiAdminLine className="text-white text-2xl uppercase " />
                    <span className="text-white text-2xl mx-2 font-semibold">
                      Admin
                    </span>
                  </div>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-white opacity-50 lg:hidden px-3 py-1 text-2xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <FaRegWindowClose />
                  </button>
                </div>
              </div>
            </div>
            <hr className="my-4 lg:min-w-full" />
            <ul className="lg:flex-col lg:min-w-full flex flex-col list-none">
              <li className="items-center">
                <button onClick={() => handleAllUsers()} className="flex items-center mt-4 mb-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
                  <FaUsers className="text-white text-2xl uppercase " />
                  <span className="text-white text-2xl mx-2 font-semibold">
                    AllUser
                  </span>
                </button>
              </li>
              
              <li className="items-center">
                <button onClick={() => handleAllSongs()}  className="flex items-center mt-4 mb-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
                  <FaMusic className="text-white text-2xl uppercase " />
                  <span className="text-white text-2xl mx-2 font-semibold">
                    AllSong
                  </span>
                </button>
              </li>
              <li className="items-center">
                <button onClick={() => handleAddSong()} className="flex items-center mt-4 mb-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
                  <FaPlusCircle className="text-white text-2xl uppercase " />
                  <span className="text-white text-2xl mx-2 font-semibold">
                    AddSong
                  </span>
                </button>
              </li>
              <li className="items-center">
                <button onClick={() => handleSignOut()} className="flex items-center mt-4 mb-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
                  <FaSignOutAlt className="text-white text-2xl uppercase " />
                  <span className="text-white text-2xl mx-2 font-semibold">
                    Sign Out
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

  );
}
export default SidebarAdmin;
