const React = require("react");
export const GuitarKeContext = React.createContext(null);
export const positionNum = {
  song_id: "",
  songname: "",
  artist: "",
  lyric: "",
  capo: "",
  tuningGuitar: "",
  tempo: "",
  time_signature: "",
  notes: 0,
  measures: 0,
  beats: 0,
  count_song_playlist: 0,
  state_metronome: false,
  state_karaoke: false,
  loading: true,
  page_num: 1,
  time_left: 4,
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, loading: false };

    //---------------------------------------------------------------------
    
    case "SONG_ID":
      return { ...state, song_id: action.payload };
    case "SONGNAME":
      return { ...state, songname: action.payload };
    case "ARTIST":
      return { ...state, artist: action.payload };
    case "LYRIC":
      return { ...state, lyric: action.payload };
    case "CAPO":
      return { ...state, capo: action.payload };
    case "TUNING_GUITAR":
      return { ...state, tuningGuitar: action.payload };
    case "TEMPO":
      return { ...state, tempo: action.payload };
    case "TIME_SIGNATURE":
      return { ...state, time_signature: action.payload };

    //---------------------------------------------------------------------

    case "TRANSPOSEUP":
      if (state.notes + 1 <= 11) {
        return { ...state, notes: state.notes + 1 };
      } else {
        return { ...state, notes: 0 };
      }
    case "TRANSPOSEDOWN":
      if (state.notes - 1 < 0) {
        return { ...state, notes: 11 };
      } else {
        return { ...state, notes: state.notes - 1 };
      }

    //---------------------------------------------------------------------
    case "NEXT_MEASURE":
      return { ...state, measures: state.measures + 1 };
    case "PREV_MEASURE":
      if (state.measures - 1 < 0) {
        return { ...state, measures: 0 };
      } else {
        return { ...state, measures: state.measures - 1 };
      }
    case "RESET_MEASURE":
      return { ...state, measures: 0 };

    //---------------------------------------------------------------------

    case "PLAY_METRONOME":
      return { ...state, state_metronome: true };
    case "PAUSE_METRONOME":
      return { ...state, state_metronome: false };

    //---------------------------------------------------------------------

    case "PLAY_KARAOKE":
      return { ...state, state_karaoke: true };
    case "PAUSE_KARAOKE":
      return { ...state, state_karaoke: false };

    //---------------------------------------------------------------------

    case "PAGE_NUM":
      return { ...state, page_num: action.payload };

    //---------------------------------------------------------------------

    case "NUM_SONG_PLAYLIST":
      return { ...state, count_song_playlist: action.payload };

    //---------------------------------------------------------------------

    case "COUNTDOWN_TIME":
      return { ...state, time_left: state.time_left - 1 };
    case "RESET_TIME":
      return { ...state, time_left: 4 };

    //---------------------------------------------------------------------



    default:
      return state;
  }
};
