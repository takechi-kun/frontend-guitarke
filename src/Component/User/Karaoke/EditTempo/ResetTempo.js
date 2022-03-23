import React from "react";
import axios from "axios"
import { Dialog, Transition } from "@headlessui/react";
import { GuitarKeContext } from "../../../../ContextAndReducer/ContextAndReducer";
function ResetTempo({ username }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const { result } = React.useContext(GuitarKeContext);

  const DefaultYourTempo = () => {
    axios
      .put(
        `http://localhost:5000/update_your_tempo/${username}/${result.song_id}`,
        {
          username: username,
          your_tempo: result.tempo,
          song_id: result.song_id
        }
      )
      .then((response) => {
        alert("Reset Your Tempo Success!");
        window.location.reload();
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
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="my-2 flex flex-row items-center w-full h-9 justify-center bg-gray-500 rounded-md active:bg-gray-700"
      >
        ResetTempo
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
                ResetTempo
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">Do you want reset your tempo?</p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center w-20 px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 mr-2"
                  onClick={DefaultYourTempo}
                >
                  Reset
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

export default ResetTempo;
