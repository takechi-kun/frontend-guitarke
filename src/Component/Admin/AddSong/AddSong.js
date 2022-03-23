import React from "react";
import SidebarAdmin from "../SidebarAdmin";
import FormSong from "./FormSong";
function AddSong() {
  return (
    <div className="relative lg:ml-64 bg-gray-500">
      <SidebarAdmin />
      <div className="overflow-x-hidden">
        <FormSong />
      </div>
    </div>
  );
}

export default AddSong;
