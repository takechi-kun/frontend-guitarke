import React from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { GuitarKeContext } from "../../../../ContextAndReducer/ContextAndReducer";
function YourTempo({ username, newTempo, setNewTempo, stateSave }) {
  const { result } = React.useContext(GuitarKeContext);
  const [isOpen, setIsOpen] = React.useState(false);

  const UpdateYourTempo = () => {
    axios
      .put(
        `http://localhost:5000/update_your_tempo/${username}/${result.song_id}`,
        {
          username: username,
          your_tempo: newTempo,
          song_id: result.song_id,
        }
      )
      .then((response) => {
        alert("๊Update Your Tempo Success!");
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
      <div className="px-1 flex justify-between">
        <span>EditTempo(Current)</span>
        <span>{newTempo} BPM</span>
      </div>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-2 flex flex-row items-center w-full h-9 justify-center bg-gray-500 rounded-md active:bg-gray-700"
      >
        EditYourTempo
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
                EditYourTempo
              </Dialog.Title>
              <div className="flex flex-row items-center mt-2">
                <div>
                  <input
                    type="number"
                    disabled={stateSave === "NotSaved" ? true : false}
                    className="pl-2 text-black ring-1 ring-black ring-opacity-20 outline-none focus:outline-none w-14 h-7 rounded-md"
                    value={newTempo}
                    onChange={(e) => {
                      setNewTempo(e.target.value);
                    }}
                  />
                  <span className="ml-2">BPM</span>
                </div>
                {/*<span
                  className={`${
                    newTempo < 20 || newTempo > 200 ? "visible" : "invisible"
                  } text-red-500 ml-6 font-thin`}
                >
                  Tempo Error
                </span>*/}
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  disabled={newTempo < 20 || newTempo > 200 ? true : false}
                  className={`${
                    newTempo < 20 || newTempo > 200
                      ? "bg-opacity-30 text-opacity-30"
                      : ""
                  } inline-flex justify-center w-20 px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md active:bg-blue-200 mr-2`}
                  onClick={() => setIsOpen(false)}
                >
                  Ok
                </button>
                <button
                  type="button"
                  disabled={newTempo < 20 || newTempo > 200 ? true : false}
                  className={`${
                    newTempo < 20 || newTempo > 200
                      ? "bg-opacity-30 text-opacity-30"
                      : ""
                  } inline-flex justify-center w-20 px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md active:bg-red-200 `}
                  onClick={UpdateYourTempo}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default YourTempo;
