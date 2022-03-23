import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { AiOutlineExclamationCircle } from "react-icons/ai";
function VerifyEmail() {
  var { user_id, token } = useParams();
  const [status, setStatus] = useState("");
  var history = useHistory();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/verify_email/${user_id}/${token}`)
      .then((response) => {
        setStatus(response.data);
      });
  }, [user_id, token]);

  return (
    <React.Fragment>
      <div class="w-screen h-screen flex justify-center items-center bg-gray-700">
        <div class="lg:p-20 p-16 transition duration-300 bg-white rounded flex justify-center items-center flex-col shadow-md">
          {status.message === "Link Verify is Expired." ? (
            <FaRegTimesCircle className="text-center lg:w-32 lg:h-32 w-24 h-24 mb-5 text-red-500" />
          ) : status.message === "Success!" ? (
            <FaRegCheckCircle className="text-center lg:w-32 lg:h-32 w-24 h-24 mb-5 text-green-500" />
          ) : (
            <AiOutlineExclamationCircle className="text-center lg:w-32 lg:h-32 w-24 h-24 mb-5 text-gray-500" />
          )}

          <div className="mb-5 lg:text-3xl text-2xl text-gray-600">
            {status.message}
          </div>
          <div className="mb-5 lg:text-3xl text-2xl text-gray-600">
            Please return to Mainpage.
          </div>

          <button
            onClick={() => history.push(`/homepage`)}
            type="button"
            class="bg-blue-600 hover:bg-blue-900 text-white text-xl p-2 rounded-3xl w-80"
          >
            <span>Mainpage</span>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
export default VerifyEmail;

