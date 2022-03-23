import React, { useState } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
function DeleteSong({ song_id }) {
  let [isOpen, setIsOpen] = useState(false);
  function deleteSong() {
    axios
      .delete(`http://localhost:5000/deleteSong_Admin/${song_id}`)
      .then((response) => {
        alert("Delete Success");
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
        window.location.reload();
      });
  }
  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="m-2 text-red-500 hover:text-red-800"
      >
        <FaTrashAlt className="text-xl" />
      </button>
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
                Delete.
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">Do you want delete this song?</p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center w-20 px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 mr-2"
                  onClick={() => deleteSong()}
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
  );
}

export default DeleteSong;
