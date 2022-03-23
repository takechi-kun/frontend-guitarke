import React from "react";
import AudioFile from "../click1.wav";
import { FaPlay, FaPause } from "react-icons/fa";
import { useContext } from "react";
import { GuitarKeContext } from "../../../../ContextAndReducer/ContextAndReducer";
function KaraokeWithMetronome({
  new_tempo,
  stateToggle,
  karaokeRef,
  metronomeRef,
  setCountBeat,
}) {
  
  const { result, dispatch } = useContext(GuitarKeContext);

  let split_time_signature = result.time_signature.split("/");
  let measures = parseInt(split_time_signature[0]);
  let beat_duration = (60000 / new_tempo).toFixed(2) ;
  let measures_duration = (beat_duration * measures) ;
  
  //Countdown --------------------------------------------------------------------------------------------------------------
  const countdown_time = React.useRef();
  function CountDown_Time() {
    dispatch({ type: "COUNTDOWN_TIME" });
    countdown_time.current = setInterval(() => {
      dispatch({ type: "COUNTDOWN_TIME" });
    }, 1000);
  }
  if (result.time_left === 0) {
    clearInterval(countdown_time.current);
  }
  //------------------------------------------------------------------------------------------------------------------------

  function PlayKaraoke() {
    karaokeRef.current = setInterval(() => {
      dispatch({ type: "NEXT_MEASURE" });
    }, measures_duration);
  }
  function PauseKaraoke() {
    clearInterval(karaokeRef.current);
  }

  const audio = new Audio(AudioFile);
  function PlayMetroNome() {
    //audio.play();
    setCountBeat(1);
    metronomeRef.current = setInterval(() => {
      //audio.play();
      setCountBeat((count) => {
        if (count % measures === 0) {
          return 1;
        } else {
          return count + 1;
        }
      });
    }, beat_duration);
  }
  function PauseMetroNome() {
    setCountBeat(0)
    clearInterval(metronomeRef.current);
  }

  //-----------------------------------------------------------------------------------------------------
  function Start() {
    dispatch({ type: "PLAY_KARAOKE" });
    CountDown_Time();
    setTimeout(() => {
      PlayKaraoke();
      if (stateToggle) {
        PlayMetroNome();
      }
    }, 3000);
  }
  function Stop() {
    dispatch({ type: "PAUSE_KARAOKE" });
    dispatch({ type: "RESET_TIME" });
    PauseKaraoke();
    if (stateToggle) {
      PauseMetroNome();
    }
  }

  //-------------------------------------------------------------------------------------------------------
  return (
    <div className="text-xl text-white text-opacity-50 hover:text-opacity-100 ">
      {!result.state_karaoke ? (
        <button
          className="flex items-center justify-center m-3 active:text-gray-300"
          onClick={Start}
        >
          <FaPlay />
        </button>
      ) : (
        <button
          disabled={
            result.time_left >= 1 && result.time_left <= 3 ? true : false
          }
          className="flex items-center justify-center m-3 active:text-gray-300"
          onClick={Stop}
        >
          <FaPause />
        </button>
      )}
    </div>
  );
}

export default KaraokeWithMetronome;
