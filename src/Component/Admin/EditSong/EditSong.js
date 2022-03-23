import React from "react";
import SidebarAdmin from "../SidebarAdmin";
import FormEdit from "./FormEdit";
function EditSong() {
  return (
    <div className="relative lg:ml-64 bg-gray-500">
      <SidebarAdmin />
      <div className="overflow-x-hidden">
        <FormEdit />
      </div>
    </div>
  );
}

export default EditSong;
