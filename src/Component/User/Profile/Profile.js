import React from "react";
import { useHistory } from "react-router-dom";
import Header from "../NavbarComponent/Header/Header";
import { getUser } from "../../../Utils/Common";
function Profile() {
  const history = useHistory();
  return (
    <React.Fragment>
      <div className="bg-white w-screen h-screen">
        <Header />
        <div className="lg:mx-48 mt-8 ">
          <div className="flex flex-col items-center">
            <p className=" mt-10 font-medium text-2xl lg:text-4xl">Profile</p>
            <hr className="mt-8" />
            <div className="flex flex-col ">
              <p className="mt-6 my-3 text-2xl font-medium">User ID : </p>
              <span className="my-3">{`${getUser().user_id}`}</span>
              <p className="my-3 text-2xl font-medium">Username : </p>
              <span className="my-3">{`${getUser().username}`}</span>
              <p className="my-3 text-2xl font-medium">Gmail : </p>
              <span className="my-3">{`${getUser().email}`}</span>
            </div>
            <button
              onClick={() => history.push("/")}
              className="my-3 text-xl bg-green-400 active:bg-green-600 px-1 py-1.5 rounded "
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Profile;
