import React, { useContext , useCallback} from "react";
import { GuitarKeContext } from "../../../ContextAndReducer/ContextAndReducer";
function Transpose() {
  const { result, dispatch } = useContext(GuitarKeContext);
  const transpose_up = useCallback(() => {
    dispatch({ type: "TRANSPOSEUP" });
  }, [dispatch]);
  const transpose_down = useCallback(() => {
    dispatch({ type: "TRANSPOSEDOWN" });
  }, [dispatch]);
  return (
    <div className="w-full h-full text-left px-1 py-1">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row ">
          <span>TRANSPOSE</span>
          {result.notes !== 0 && `(${result.notes})`}
        </div>

        <div className="text-2xl">
          <button
            className={`w-8 h-8 bg-gray-500 bg-opacity-80 hover:bg-opacity-100 active:bg-gray-600`}
            onClick={transpose_up}
          >
            +
          </button>
          <button
            className="w-8 h-8 bg-gray-500 bg-opacity-80 hover:bg-opacity-100 active:bg-gray-600"
            onClick={transpose_down}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
}

export default Transpose;
