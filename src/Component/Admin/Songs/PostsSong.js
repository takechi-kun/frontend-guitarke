import React from "react";
import { FaEdit } from "react-icons/fa";
import DeleteSong from "./DeleteSong";
import { useHistory } from "react-router-dom";
function PostsSong({ currentPostsSong }) {
  var history = useHistory();

  return (
    <div className="flex flex-col">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className=" min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center">
              <thead className="border-b bg-gray-800">
                <tr>
                  <th
                    className="text-sm font-medium text-white px-3 py-2"
                  >
                    Song_Id
                  </th>
                  <th
                    className="text-sm font-medium text-white px-3 py-2"
                  >
                    Songname
                  </th>
                  <th
                    className="text-sm font-medium text-white px-3 py-2"
                  >
                    Artist
                  </th>
                  <th
                    className="text-sm font-medium text-white px-3 py-2"
                  >
                    Tuningguitar
                  </th>
                  <th
                    className="text-sm font-medium text-white px-3 py-2"
                  >
                    Tempo
                  </th>
                  <th
                    className="text-sm font-medium text-white px-3 py-2"
                  >
                    Edit / Delete
                  </th>
                </tr>
              </thead>
              {currentPostsSong.map((song, index) => {
                return (
                  <tbody key={index}>
                    <tr className="bg-white border-b">
                      <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                        {song.song_id}
                      </td>
                      <td className="border-l text-sm text-gray-900 font-light px-2 py-2 whitespace-nowrap">
                        {song.songname}
                      </td>
                      <td className="border-l text-sm text-gray-900 font-light px-2 py-2 whitespace-nowrap">
                        {song.artist}
                      </td>
                      <td className="border-l text-sm text-gray-900 font-light px-2 py-2 whitespace-nowrap">
                        {song.tuning_guitar}
                      </td>
                      <td className="border-l text-sm text-gray-900 font-light px-2 py-2 whitespace-nowrap">
                        {song.tempo}
                      </td>
                      <td className="border-l text-sm text-gray-900 font-light px-2 py-2 whitespace-nowrap">
                        <div className="flex flex-row items-center justify-center">
                          <button
                            onClick={() =>
                              history.push(`/edit_song/${song.song_id}`)
                            }
                            className="m-2 text-blue-500 hover:text-blue-800"
                          >
                            <FaEdit className="text-xl" />
                          </button>
                          <DeleteSong song_id={song.song_id} />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostsSong;
