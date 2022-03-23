import React from "react";
import TableUser from "./TableUser";
import SidebarAdmin from "../SidebarAdmin";
function AllUsers() {
  return (
    <div className="relative lg:ml-64 bg-gray-500">
      <SidebarAdmin />
      <div className="px-8 py-8 lg:px-6 lg:py-6 lg:h-screen lg:overflow-hidden">
        <TableUser />
      </div>
    </div>
  );
}
export default AllUsers;
