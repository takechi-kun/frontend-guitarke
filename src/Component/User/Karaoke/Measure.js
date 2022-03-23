import React from "react";
import { useContext, useCallback } from "react";
import { GuitarKeContext } from "../../../ContextAndReducer/ContextAndReducer"
import { FaBackward, FaForward } from "react-icons/fa";
function Measure({ numMeasure }) {
  const { result, dispatch } = useContext(GuitarKeContext);
  const Next = useCallback(() => {
    dispatch({ type: "NEXT_MEASURE" })
  }, [dispatch]);
  const Prev = useCallback(() => {
    dispatch({ type: "PREV_MEASURE" })
  }, [dispatch]);

  return (
    <div className="flex flex-row justify-between text-white text-opacity-50 hover:text-opacity-100">
      <div className="flex flex-row items-center mx-1.5 ">
        {`Measure : ${result.measures + 1} / ${numMeasure}`}
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="text-xl text-center">
          <button
            disabled={result.state_karaoke  && true}
            className={`p-1.5  active:text-gray-300`}
            onClick={Prev}
          >
            <FaBackward />
          </button>
          <button
            disabled={result.state_karaoke && true}
            className="mr-1.5 p-1.5   active:text-gray-300"
            onClick={Next}
          >
            <FaForward />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Measure;
