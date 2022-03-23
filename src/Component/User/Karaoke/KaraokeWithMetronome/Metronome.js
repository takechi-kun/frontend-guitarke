import React, { useRef } from "react";

import AudioFile from "../click1.wav";
import { GiMetronome } from "react-icons/gi";
import { useContext } from "react";
import { GuitarKeContext } from "../../../../ContextAndReducer/ContextAndReducer";

function CreateCircle(num_circle) {
  let create_circle = [];
  for (var c = 1; c <= parseInt(num_circle); c++) {
    create_circle.push(c);
  }
  return create_circle;
}

function Metronome({
  new_tempo,
  stateToggle,
  countBeat,
  setCountBeat,
}) {
  const { result, dispatch } = useContext(GuitarKeContext);
  let beat_duration = 60000 / new_tempo;
  let audio = new Audio(AudioFile);
  const play_audio = useRef();
  let split_time_signature = result.time_signature.split("/");

  const playMetronome = () => {
    dispatch({ type: "PLAY_METRONOME" });
    audio.play();
    setCountBeat(1);
    play_audio.current = setInterval(() => {
      audio.play();
      setCountBeat((count) => {
        if (count % parseInt(split_time_signature[0]) === 0) {
          return 1;
        } else {
          return count + 1;
        }
      });
    }, beat_duration);
  };
  const pauseMetronome = () => {
    dispatch({ type: "PAUSE_METRONOME" });
    clearInterval(play_audio.current);
    setCountBeat(0);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <span>METRONOME</span>
      <div
        className={`${
          stateToggle
            ? "text-opacity-50 text-green-500"
            : `${
                !result.state_metronome
                  ? "text-green-500 active:text-green-700"
                  : "text-red-500 active:text-red-700"
              }`
        }  rounded-full w-12 h-12 bg-white text-3xl flex items-center justify-center m-2`}
      >
        {!result.state_metronome ? (
          <button
            className={stateToggle ? "cursor-default" : ""}
            disabled={stateToggle ? true : false}
            type="button"
            onClick={playMetronome}
          >
            <GiMetronome />
          </button>
        ) : (
          <button
            className={stateToggle ? "cursor-default" : ""}
            disabled={stateToggle ? true : false}
            type="button"
            onClick={pauseMetronome}
          >
            <GiMetronome />
          </button>
        )}
      </div>
      <div className="flex flex-row items-center justify-center">
        {CreateCircle(split_time_signature[0]).map((index) => {
          return (
            <div
              className={`${
                countBeat === index && "bg-red-500"
              } m-2 bg-white w-4 h-4 rounded-full`}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Metronome;
