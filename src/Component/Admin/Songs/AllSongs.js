import React from "react";
import TableSong from "./TableSong";
import SidebarAdmin from "../SidebarAdmin";
function AllSongs() {
  return (
    <div className="relative lg:ml-64 bg-gray-500 ">
      <SidebarAdmin />
      <div className="px-8 py-8 lg:px-6 lg:py-6 lg:h-screen lg:overflow-hidden">
        <TableSong />
      </div>
    </div>
  );
}
export default AllSongs;
