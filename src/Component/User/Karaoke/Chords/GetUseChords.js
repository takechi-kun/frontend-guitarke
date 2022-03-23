import React from "react";
import ShowChord from "./ShowChord";
function GetUseChords({ getAllPlayChord }) {
  function getUseChords(getUseChords) {
    let getAllUseChord = [];
    let countAllChord = 0;
    const MapChord = new Map();
    while (countAllChord < getUseChords.length) {
      let countThisChord = 0;
      if (!MapChord.has(getUseChords[countAllChord])) {
        MapChord.set(getUseChords[countAllChord], 1);
      } else {
        countThisChord = MapChord.get(getUseChords[countAllChord]);
        countThisChord++;
        MapChord.set(getUseChords[countAllChord], countThisChord);
      }
      countAllChord++;
    }
    for (let [key] of MapChord) {
      getAllUseChord.push(key);
    }
    return getAllUseChord;
  }

  return (
    <div className="text-sm mx-20 my-5">
      <div>
        <h1 className="ml-4 mb-2 text-2xl font-bold underline">Chords</h1>
        <div className="grid xl:grid-cols-11 lg:grid-cols-9 md:grid-cols-7 sm:grid-cols-5 grid-cols-4">
          {getUseChords(getAllPlayChord).map((chord) => {
            return (
              <div
                key={chord}
                className="flex flex-col items-center"
              >
                <header className="mt-2">{chord}</header>
                <ShowChord AllChord={chord} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GetUseChords;
