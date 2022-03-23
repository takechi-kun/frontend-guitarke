import React, { useEffect } from "react";
import { Switch } from "@headlessui/react";
import { useContext } from "react";
import { GuitarKeContext } from "../../../../ContextAndReducer/ContextAndReducer";
function SwitchToggle({ enabled, setEnabled, setStateToggle }) {
  const { result } = useContext(GuitarKeContext);
  useEffect(() => {
    if (enabled) {
      setStateToggle(true);
    } else {
      setStateToggle(false);
    }
  }, [enabled, setStateToggle]);

  return (
    <div>
      <div className="w-full h-full text-left px-1 py-1">
        <div className="flex flex-row items-center justify-between">
          <span>KaraokeWithMetronome</span>
          <Switch
            disabled={
              result.state_karaoke || result.state_metronome ? true : false
            }
            checked={enabled}
            onChange={setEnabled}
            className={`${
              enabled ? "bg-blue-600" : "bg-gray-400"
            } transition-colors ease-in-out duration-100 relative inline-flex items-center h-6 rounded-full w-11 ${
              result.state_karaoke ? "cursor-default" : ""
            }`}
          >
            <span
              className={`${
                enabled ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full`}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default SwitchToggle;
