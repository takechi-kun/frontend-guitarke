import { Menu } from "@headlessui/react";
import { FaCaretDown, FaGuitar } from "react-icons/fa";
import { useHistory } from 'react-router-dom';
import React from "react";
import SearchBar from "../Search/SearchBar";
import { removeUserSession } from '../../../../Utils/Common';
function Header() {
  var history = useHistory();
  function SignOutHandle() {
    removeUserSession();
    history.push("/homepage");
  }
  return (
    <header className="bg-gradient-to-r from-green-800 via-red-700 to-gray-800 w-full h-16 flex items-center justify-between ">
      <a href="/" className="text-gray-200 hover:text-gray-400 mx-6 text-2xl">
        <div className="flex flex-row items-center">      
            <FaGuitar className="mr-2" />
            GuitarKe
        </div>
      </a>
      <SearchBar />
      <div className="mx-6">
        <Menu>
          <Menu.Button className="w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300">
            <FaCaretDown
              className= "text-2xl inline-flex justify-center"
              aria-hidden="true"
            />
          </Menu.Button>
          <Menu.Items className="mt-2 absolute right-0 mx-6 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                <button onClick={() => history.push("/profile")} className="w-full h-full text-left p-3 rounded-t hover:bg-gray-200">Profile</button>
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
              <button onClick={() => history.push("/update_password")} className="w-full h-full text-left p-3 hover:bg-gray-200">Update Password</button>
              </Menu.Item>
            </div> 
            <div className="px-1 py-1">
              <Menu.Item>
              <button onClick={() => SignOutHandle()} className="w-full h-full text-left p-3 rounded-b hover:bg-gray-200">Sign Out</button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>
    </header>
  );
}
export default Header;
