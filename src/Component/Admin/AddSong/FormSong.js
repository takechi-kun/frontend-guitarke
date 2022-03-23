import React from "react";
import { FaPlusSquare } from "react-icons/fa";
import AddSongModal from "./AddSongModal";
import { GuitarKeContext } from "../../../ContextAndReducer/ContextAndReducer";
function FormSong() {
  const { result, dispatch } = React.useContext(GuitarKeContext);

  function CapoSelect() {
    let capofret = [];
    for (let i = -1; i <= 6; i++) {
      if (i === -1) {
        capofret.push(
          <option key={i} value="">
            Select Capo
          </option>
        );
      } else if (i === 0) {
        capofret.push(
          <option key={i} value={i}>
            No Capo
          </option>
        );
      } else {
        capofret.push(
          <option key={i} value={i}>
            Capo {i} fret
          </option>
        );
      }
    }
    return capofret;
  }

  return (
    <React.Fragment>
      <div className="mx-16 my-16">
        <div className="bg-green-500 shadow-md uppercase rounded-t-lg text-4xl p-5 cursor-default flex items-center justify-center">
          <FaPlusSquare className="mr-2" /> addsong
        </div>
        <form className="bg-white-300 rounded-b-lg bg-white shadow-md">
          <div className="flex flex-col ">
            <div className="m-4">
              <label className="text-base">Songname</label>
              <br />
              <input
                type="text"
                className="mt-2 bg-clip-padding transition ease-in-out w-full px-3 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg text-sm outline-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={result.songname}
                onChange={(e) => dispatch({ type: "SONGNAME", payload: e.target.value })}
              />
            </div>
            <div className="mx-4 mb-4">
              <label className="text-base">Artist</label>
              <br />
              <input
                type="text"
                className="mt-2 bg-clip-padding transition ease-in-out w-full px-3 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg text-sm outline-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={result.artist}
                onChange={(e) => dispatch({ type: "ARTIST", payload: e.target.value })}
              />
            </div>
            <div className="mx-4 mb-4">
              <label className="text-base">Tempo</label>
              <br />
              <input
                type="number"
                className="mt-2 bg-clip-padding transition ease-in-out w-full px-3 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg text-sm outline-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={result.tempo}
                onChange={(e) => dispatch({ type: "TEMPO", payload: e.target.value })}
              />
            </div>
            <div className="mx-4 mb-4">
              <label className="text-base">Capo</label>
              <br />
              <select
                className="mt-2 bg-clip-padding transition ease-in-out w-full px-3 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg text-sm outline-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={result.capo}
                onChange={(e) => dispatch({ type: "CAPO", payload: e.target.value })}
              >
                {CapoSelect()}
              </select>
            </div>
            <div className="mx-4 mb-4">
              <label className="text-base">TuningGuitar</label>
              <br />
              <select
                className="mt-2 bg-clip-padding transition ease-in-out w-full px-3 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg text-sm outline-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={result.tuningGuitar}
                onChange={(e) => dispatch({ type: "TUNING_GUITAR", payload: e.target.value })}
              >
                <option value="">Select Tuning</option>
                <option value="E A D G B E">standard</option>
                <option value="Eb Ab Db Gb Bb Eb">halfdown</option>
              </select>
            </div>

            <div className="mx-4 mb-4">
              <label className="text-base">Time Signature</label>
              <br />
              <select
                className="mt-2 bg-clip-padding transition ease-in-out w-full px-3 py-3  bg-gray-100 border-2 border-gray-200 rounded-lg text-sm outline-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={result.time_signature}
                onChange={(e) => dispatch({ type: "TIME_SIGNATURE", payload: e.target.value })}
              >
                <option value="">Select Time Signature</option>
                <option value="2/4">2/4</option>
                <option value="3/4">3/4</option>
                <option value="4/4">4/4</option>
                <option value="6/8">6/8</option>
              </select>
            </div>
            <div className="mx-4 mb-4">
              <label className="text-base">Lyric</label>
              <br />
              <textarea
                className="mt-2 text-xl bg-clip-padding transition ease-in-out w-full h-72 resize-none px-3 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={result.lyric}
                onChange={(e) => dispatch({ type: "LYRIC", payload: e.target.value })}
              />
            </div>
            <AddSongModal />
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
export default FormSong;
