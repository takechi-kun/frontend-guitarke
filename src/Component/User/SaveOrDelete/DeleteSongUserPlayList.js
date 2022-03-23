import React from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";

function DeleteSongUserPlayList({ username, song_id }) {
  const [isOpen, setIsOpen] = React.useState(false);
  function deleteThisSong() {
    axios
      .delete(`http://localhost:5000/delete/${username}/${song_id}`)
      .then((response) => {
        alert("Delete Success");
        //console.log(response)
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
        //console.log(error)
        window.location.reload();
      });
  }
  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-row items-center justify-center bg-white h-12 w-12 rounded-full hover:bg-gray-200"
      >
        <FaTrashAlt className="text-red-500 text-2xl" />
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
                Delete This Song.
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">Do you want delete this song?</p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center w-20 px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 mr-2"
                  onClick={() => deleteThisSong()}
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
export default DeleteSongUserPlayList;
