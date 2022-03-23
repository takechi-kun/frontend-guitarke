import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
function ForgotPasswordModal({
  email_username,
  new_password,
  confirmpassword,
}) {
  const [messageAlert, setMessageAlert] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const handleUpdateSong = () => {
    axios
      .put(`http://localhost:5000/forgotpassword`, {
        email_username: email_username,
        new_password: new_password,
        confirmpassword: confirmpassword,
      })
      .then((response) => {
        setMessageAlert("Success");
        setIsOpen(true);
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 401) {
          setMessageAlert(error.response.data.message);
          setIsOpen(true);
        } else {
          setMessageAlert("Something Wrong Please Try Again");
          setIsOpen(true);
        }
      });
  };
  return (
    <div>
      <div className="flex justify-center">
        <button
          onClick={() => history.push("/homepage")}
          className="mt-8 active:bg-gray-400  bg-gray-200 mr-2 text-blue-500 py-2 px-4 rounded "
        >
          Cancel
        </button>
        <button
          onClick={() => handleUpdateSong()}
          className="mt-8 active:bg-blue-700 ml-2 bg-blue-500 text-white py-2 px-4 rounded "
        >
          Confirm
        </button>
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
            {messageAlert === "Success" ? (
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                  Success
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Complete</p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center w-20 px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 mr-2"
                    onClick={() => history.push("/")}
                  >
                    Ok
                  </button>
                </div>
              </div>
            ) : (
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                  Failed.
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{messageAlert}</p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center w-20 px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 mr-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Ok
                  </button>
                </div>
              </div>
            )}
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default ForgotPasswordModal;
