import React, { useState, useEffect, useRef, useContext } from "react";
import { FaCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import ChordSheetJS, { parseChord } from "chordsheetjs";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../NavbarComponent/Header/Header";
import Metronome from "./KaraokeWithMetronome/Metronome";
import DetailSong from "./DetailSong";
import Transpose from "./Transpose";
import Measure from "./Measure";
import YourTempo from "./EditTempo/YourTempo";
import GetUseChords from "./Chords/GetUseChords";
import KaraokeWithMetronome from "./KaraokeWithMetronome/KaraokeWithMetronome";
import SwitchToggle from "./KaraokeWithMetronome/SwitchToggle";
import ResetTempo from "./EditTempo/ResetTempo";
import "./CSSLyrics/Lyrics.css";
import { getUser } from "../../../Utils/Common";
import { GuitarKeContext } from "../../../ContextAndReducer/ContextAndReducer";

function KaraokePage() {
  const user = getUser();
  const { result, dispatch } = useContext(GuitarKeContext);
  const [countBeat, setCountBeat] = useState(0);
  const [yours_tempo, setYours_Tempo] = useState("");
  const [nowyour_tempo, setNowYour_Tempo] = useState("");
  const [defaultTempo, setDefaultTempo] = useState("");
  const [stateSave, setStateSave] = useState("");
  const [stateToggle, setStateToggle] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const { get_songname, get_artist } = useParams();

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(
          `http://localhost:5000/getSongDetail/${get_songname}/${get_artist}`
        )
        .then((data) => {
          dispatch({ type: "SONG_ID", payload: data.data[0].song_id });
          dispatch({ type: "SONGNAME", payload: data.data[0].songname });
          dispatch({ type: "ARTIST", payload: data.data[0].artist });
          dispatch({ type: "LYRIC", payload: data.data[0].lyric });
          dispatch({ type: "CAPO", payload: data.data[0].capo });
          dispatch({
            type: "TUNING_GUITAR",
            payload: data.data[0].tuning_guitar,
          });
          dispatch({ type: "TEMPO", payload: data.data[0].tempo });
          dispatch({
            type: "TIME_SIGNATURE",
            payload: data.data[0].time_signature,
          });
          setDefaultTempo(data.data[0].tempo);
          dispatch({ type: "loading" });
        });
      document.title = `${get_songname} - ${get_artist} | GuitarKe`;
    }, 1000);
  }, [get_songname, get_artist, dispatch]);

  useEffect(() => {
    const checkStateSave = axios.get(
      `http://localhost:5000/get/${user.username}/${result.song_id}`
    );
    checkStateSave
      .then((response) => {
        setStateSave(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });

    const getYourTempo = axios.get(
      `http://localhost:5000/get_your_tempo/${user.username}/${result.song_id}`
    );
    getYourTempo
      .then((response) => {
        setYours_Tempo(response.data[0].your_tempo);
        setNowYour_Tempo(response.data[0].your_tempo);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.username, result.song_id]);

  const nodeLyric = [];
  const splitNewLine = result.lyric.split("\n");
  const getAllPlayChord = [];
  for (let i = 0; i < splitNewLine.length; i++) {
    const song = new ChordSheetJS.ChordProParser().parse(splitNewLine[i]);
    song.lines.forEach((line) => {
      line.items.forEach((item) => {
        let chord = parseChord(item.chords);
        if (chord) {
          chord = chord.transpose(result.notes);
          item.chords = chord.toString();
          getAllPlayChord.push(chord.toString());
        }
      });
    });
    const disp = new ChordSheetJS.HtmlTableFormatter().format(song);
    nodeLyric.push(
      <div
        className={`${
          result.measures === i && "text-3xl  text-red-500"
        } text-white my-16 mx-8 text-lg `}
        key={i}
        dangerouslySetInnerHTML={{ __html: disp }}
      />
    );
  }

  const karaokeRef = useRef();
  const metronomeRef = useRef();
  useEffect(() => {
    if (result.measures === splitNewLine.length) {
      clearInterval(karaokeRef.current);
      clearInterval(metronomeRef.current);
      dispatch({ type: "PAUSE_KARAOKE" });
      dispatch({ type: "RESET_MEASURE" });
      setCountBeat(0);
      dispatch({ type: "RESET_TIME" });
    }
  }, [dispatch, nodeLyric, result.measures, splitNewLine.length]);

  if (result.measures < splitNewLine.length) {
    nodeLyric.splice(0, result.measures);
  }

  return (
    <>
      {result.loading ? (
        <div>Loading...</div>
      ) : (
        <div className="select-none bg-gradient-to-b from-green-900 via-yellow-600 to-gray-800 w-full h-full ">
          <Header />
          <div className="bg-white 2xl:mx-44 shadow-lg">
            <div className="flex flex-col">
              <DetailSong />
              <hr className="mx-10" />
              <GetUseChords getAllPlayChord={getAllPlayChord} />
              <hr className="mx-10" />
              <div className="flex flex-col md:flex-row justify-center mx-20 my-7 ">
                <div className="mr-2">
                  <div className="ChordSheetOutPut w-135 h-90 cursor-default overflow-hidden bg-black rounded-md">
                    <div>{nodeLyric}</div>
                  </div>

                  <div
                    className={`${
                      result.time_left === 0 || result.time_left === 4
                        ? "hidden"
                        : ""
                    } -mt-120 flex items-center justify-center text-5xl absolute w-135 h-90 cursor-default text-white bg-gray-500 bg-opacity-50 rounded-md`}
                  >
                    {result.time_left}
                  </div>
                  <div
                    className={`${
                      result.time_left >= 1 && result.time_left <= 3
                        ? "hidden"
                        : ""
                    } -mt-120 absolute flex flex-row items-center justify-between bg-black w-135 rounded-t-md`}
                  >
                    <KaraokeWithMetronome
                      new_tempo={
                        stateSave === "NotSaved"
                          ? parseInt(defaultTempo)
                          : parseInt(yours_tempo)
                      }
                      karaokeRef={karaokeRef}
                      metronomeRef={metronomeRef}
                      stateToggle={stateToggle}
                      setCountBeat={setCountBeat}
                    />

                    <Measure numMeasure={splitNewLine.length} />
                  </div>
                </div>
                <div className="ml-2 w-72 h-full bg-gray-700 text-white p-3 rounded-md">
                  <div className="text-lg">
                    {stateSave === "NotSaved" ? (
                      <div className="flex flex-row justify-between items-center text-red-500 ">
                        <span className="mr-1">
                          <FaRegTimesCircle />
                        </span>
                        <span>Unsaved</span>
                      </div>
                    ) : (
                      <div className="flex flex-row justify-between items-center text-green-500">
                        <span className="mr-1">
                          <FaCheckCircle />
                        </span>
                        <span>Saved</span>
                      </div>
                    )}
                  </div>
                  <hr className="my-2" />
                  <Metronome
                    new_tempo={
                      stateSave === "NotSaved" ? defaultTempo : yours_tempo
                    }
                    stateToggle={stateToggle}
                    countBeat={countBeat}
                    setCountBeat={setCountBeat}
                  />
                  <hr className="my-2" />
                  <Transpose />
                  {stateSave === "Saved" && (
                    <div>
                      <hr className="my-2" />
                      <SwitchToggle
                        enabled={enabled}
                        setEnabled={setEnabled}
                        setStateToggle={setStateToggle}
                      />
                      <hr className="my-2" />
                      <div className="px-1 py-1 flex flex-row items-center justify-between">
                        <span>YourTempo(Now)</span>
                        <span>{nowyour_tempo} BPM</span>
                      </div>
                      <hr className="my-2" />
                      <YourTempo
                        newTempo={
                          stateSave === "NotSaved" ? defaultTempo : yours_tempo
                        }
                        setNewTempo={
                          stateSave === "NotSaved"
                            ? setDefaultTempo
                            : setYours_Tempo
                        }
                        username={user.username}
                        songname={get_songname}
                        artist={get_artist}
                        stateSave={stateSave}
                      />
                      <ResetTempo username={user.username} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default KaraokePage;
