import React from "react";
import SidebarAdmin from "../Admin/SidebarAdmin";
function Dashboard() {
  return (
    <React.Fragment>
      <div className="relative lg:ml-64 bg-gray-400 bg-gradient-to-r from-white to-grey-500">
        <SidebarAdmin />
        <div className="flex h-screen justify-center items-center font-bold text-transparent text-5xl lg:text-7xl xl:text-9xl bg-clip-text bg-gradient-to-r from-gray-500 to-blue-500 select-none">
          Welcome To Admin.
        </div>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
