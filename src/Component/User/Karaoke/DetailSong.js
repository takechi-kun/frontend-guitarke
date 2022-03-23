import React, { useContext} from "react";
import { GuitarKeContext } from "../../../ContextAndReducer/ContextAndReducer";
function DetailSong() {
  const { result } = useContext(GuitarKeContext);
  return (
    <div className="px-20 ml-5">
      <h1 className="text-2xl font-bold underline pt-5 pb-2">Details</h1>
      <div className="flex lg:flex-row flex-col font-thin text-base pb-5">
        <div className="flex flex-col">
          <span>{`Songname : ${result.songname}`}</span>
          <span>
            {result.capo === "0" ? `Capo : No Capo` : `Capo : ${result.capo} fret`}
          </span>
          <span>{`Tempo : ${result.tempo} bpm`}</span>
        </div>
        <div className="flex flex-col lg:px-10">
          <span>{`Artist : ${result.artist} `}</span>
          <span>{`Tuning : ${result.tuningGuitar}`}</span>
          <span>{`Time Signature : ${result.time_signature}`}</span>
        </div>
      </div>
    </div>
  );
}

export default DetailSong;
