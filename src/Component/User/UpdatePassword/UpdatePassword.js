import React from "react";
import axios from "axios";
import Header from "../NavbarComponent/Header/Header";
import { Dialog, Transition } from "@headlessui/react";
import { getUser } from "../../../Utils/Common";
import { useHistory } from "react-router-dom";
function UpdatePassword() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [current_password, setCurrent_Password] = React.useState("");
  const [new_password, setNew_Password] = React.useState("");
  const [confirm_newpassword, setConfirm_NewPassword] = React.useState("");
  const history = useHistory();
  const handleUpdatePassword = () => {
    axios
      .put(`http://localhost:5000/update_password`, {
        user_id: getUser().user_id,
        current_password: current_password,
        new_password: new_password,
        confirm_newpassword: confirm_newpassword,
      })
      .then((response) => {
        alert("Success");
        history.push("/");
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 401) {
          alert(error.response.data.message);
        } else {
          alert("Something Wrong Please Try Again");
        }
      });
  };
  return (
    <React.Fragment>
      <div className="bg-white w-screen h-screen">
        <Header />
        <div className="lg:mx-48 mt-8 ">
          <p className="ml-10 mt-10 font-medium text-2xl lg:text-4xl">
            Update Password
          </p>
          <hr className="mt-8" />
          <div className="flex flex-col items-center justify-center mt-8">
            <div className="bg-gray-100 bg-opacity-50 shadow-md rounded-lg flex flex-col items-end mr-2 p-10">
              <div className="p-5">
                <span className="mr-2">Current Password :</span>
                <input
                  type="password"
                  className="border border-gray-200 outline-none"
                  onChange={(e) => setCurrent_Password(e.target.value)}
                />
              </div>
              <div className="p-5">
                <span className="mr-2">New Password :</span>
                <input
                  type="password"
                  className="border border-gray-200 outline-none"
                  onChange={(e) => setNew_Password(e.target.value)}
                />
              </div>
              <div className="p-5">
                <span className="mr-2">Confirm New Password :</span>
                <input
                  type="password"
                  className="border border-gray-200 outline-none"
                  onChange={(e) => setConfirm_NewPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="text-green-500 text-xl mt-10 hover:underline active:text-green-700"
            >
              Update
            </button>
          </div>
        </div>
        <Transition appear show={isOpen}>
          <Dialog
            className="fixed inset-0 z-10 bg-gray-500 bg-opacity-75 overflow-y-auto"
            onClose={() => setIsOpen(false)}
          >
            <div className="min-h-screen px-4 text-center">
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                  Update Password?
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Do you want update your password?
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center w-20 px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 mr-2"
                    onClick={() => handleUpdatePassword()}
                  >
                    Ok
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center w-20 px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </React.Fragment>
  );
}

export default UpdatePassword;
