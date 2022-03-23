import React, { useState } from "react";
import * as vexchords from "vexchords";
import { findGuitarChord } from "chord-fingering";
function ShowChord({ AllChord }) {
  const [indexChord, setIndexChord] = useState(0);

  //DetailToDrawChord----------------------------------------------------------------------------------------
  let chord = [],
    position = [],
    barres = [];

  var chordFind = findGuitarChord(AllChord);
  var finger = chordFind.fingerings[indexChord];
  var positionString = finger.positionString;
  var positonBarreChord = finger.barre;

  var fingerCheck = chordFind.fingerings;
  //console.log(fingerCheck)

  function PrevChord() {
    if (indexChord - 1 < 0) {
      setIndexChord(fingerCheck.length - 1);
    } else {
      setIndexChord(indexChord - 1);
    }
  }
  function NextChord() {
    if (indexChord + 1 > fingerCheck.length - 1) {
      setIndexChord(0);
    } else {
      setIndexChord(indexChord + 1);
    }
  }

  let detailStringChord = [],
    detailPosition = 15,
    detailBarre = [];
  let positionMoreFive = 0;
  if (positionString.length === 6) {
    if (positonBarreChord === null) {
      detailBarre = null;
      for (let i = 0; i < positionString.length; i++) {
        let positionChord = positionString[i];
        if (positionChord !== "x" && parseInt(positionChord) !== 0) {
          if (parseInt(positionChord) < detailPosition) {
            detailPosition = parseInt(positionChord);
          }
          if (parseInt(positionChord) > 5) {
            positionMoreFive += 1;
          }
        }
      }
      for (let i = 1; i <= 6; i++) {
        let reversePostionString = positionString.length - i;
        let setNewPostion = positionString[reversePostionString];
        if (positionMoreFive > 0) {
          if (setNewPostion !== "x" && parseInt(setNewPostion) !== 0) {
            setNewPostion = parseInt(setNewPostion) - detailPosition + 1;
          }
        } else {
          detailPosition = null;
        }
        detailStringChord.push([i, setNewPostion]);
      }
    } else {
      let fromString = 6 - positonBarreChord.stringIndices.shift();
      let toString = 6 - positonBarreChord.stringIndices.pop();
      detailPosition = positonBarreChord.fret;
      detailBarre.push({ fromString: fromString, toString: toString, fret: 1 });

      for (let i = 1; i <= 6; i++) {
        let reversePostionString = positionString.length - i;
        let setNewPostion = positionString[reversePostionString];
        if (setNewPostion !== "x" && parseInt(setNewPostion) !== 0) {
          setNewPostion = parseInt(setNewPostion) - detailPosition + 1;
        }
        detailStringChord.push([i, setNewPostion]);
      }

      let StringChordlength = detailStringChord.length;
      while (StringChordlength--) {
        if (detailStringChord[StringChordlength][1] === 1) {
          detailStringChord.splice(StringChordlength, 1);
        }
      }
    }
    chord.push(detailStringChord);
    position.push(detailPosition);
    barres.push(detailBarre);
  }
  // String is not 6 -------------------------------------------------------------------------------------------
  else {
    const chordSplit = positionString.split("-");
    if (positonBarreChord === null) {
      detailBarre = null;
      for (let i = 0; i < chordSplit.length; i++) {
        let positionChord = chordSplit[i];
        if (positionChord !== "x" && parseInt(positionChord) !== 0) {
          if (parseInt(positionChord) < detailPosition) {
            detailPosition = parseInt(positionChord);
          }
        }
      }
      for (let i = 1; i <= 6; i++) {
        let reversePostionString = chordSplit.length - i;
        let setNewPostion = chordSplit[reversePostionString];
        if (setNewPostion !== "x" && parseInt(setNewPostion) !== 0) {
          setNewPostion = parseInt(setNewPostion) - detailPosition + 1;
        }
        detailStringChord.push([i, setNewPostion]);
      }
    } else {
      let fromString = 6 - positonBarreChord.stringIndices.shift();
      let toString = 6 - positonBarreChord.stringIndices.pop();
      detailPosition = positonBarreChord.fret;
      detailBarre.push({ fromString: fromString, toString: toString, fret: 1 });
      for (let i = 1; i <= 6; i++) {
        let reversePostionString = chordSplit.length - i;
        let setNewPostion = chordSplit[reversePostionString];
        if (setNewPostion !== "x" && parseInt(setNewPostion) !== 0) {
          setNewPostion = parseInt(setNewPostion) - detailPosition + 1;
        }
        detailStringChord.push([i, setNewPostion]);
      }

      let StringChordlength = detailStringChord.length;
      while (StringChordlength--) {
        if (detailStringChord[StringChordlength][1] === 1) {
          detailStringChord.splice(StringChordlength, 1);
        }
      }
    }
    chord.push(detailStringChord);
    position.push(detailPosition);
    barres.push(detailBarre);
  }

  function DrawAllChord() {
    let drawChords = [];
    let chordElement = document.createElement("div");
    vexchords.draw(
      chordElement,
      {
        chord: chord[0],
        position: position[0],
        barres: barres[0],
      },
      {
        numStrings: 6,
        numFrets: 5,
        fontSize: "9px",
        width: 100,
        height: 120,
        showTuning: false,
        circleRadius: 5,
        fretWidth: 3,
        defaultColor: "#000",
      }
    );
    drawChords.push(chordElement);
    return drawChords;
  }

  return (
    <div>
      <div>
        {DrawAllChord().map((getChord) => {
          return (
            <div key={getChord}>
              <div className="flex flex-col items-center">
                <div
                  className="chord text-center"
                  dangerouslySetInnerHTML={{ __html: getChord.innerHTML }}
                />
                <div className="flex flex-row ">
                  <div>
                    <button onClick={PrevChord}>{"<"}</button>
                    {`${indexChord + 1} of ${fingerCheck.length}`}
                    <button onClick={NextChord}>{">"}</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default ShowChord;
