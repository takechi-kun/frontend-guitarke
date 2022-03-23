import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { setUserSession } from "../../../Utils/Common";
import SignInModal from "./SignInModal";
function SignIn() {
  const [stateLoading, setStateLoading] = useState(false);
  const [email_username, setEmail_Username] = useState("");
  const [password, setPassword] = useState("");
  const [messageAlert, setMessageAlert] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const handleSignIn = () => {
    setStateLoading(true);
    axios
      .post("http://localhost:5000/signin", {
        email_username: email_username,
        password: password,
      })
      .then((response) => {
        setStateLoading(false);
        setUserSession(response.data.token, response.data.user);
        history.push("/");
      })
      .catch((error) => {
        setStateLoading(false);
        setIsOpen(true);
        if (error.response.status === 400 || error.response.status === 401) {
          setMessageAlert(error.response.data.message);
        } else {
          setMessageAlert("Something Wrong Please Try Again");
        }
      });
  };

  return (
    <div className="flex items-center justify-center">
      <div className=" py-12 w-auto h-auto bg-white flex flex-col justify-center items-center shadow-md rounded-lg">
        <h1 className="font-bold text-5xl ">Sign In</h1>
        <form className="px-5 flex flex-col">
          <input
            className="bg-clip-padding transition ease-in-out mt-16 shadow rounded border border-gray-400 w-81 h-14 py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:border-blue-900  focus:ring-blue-600"
            type="text"
            placeholder="Email/Username"
            onChange={(e) => setEmail_Username(e.target.value)}
          />
          <input
            className="bg-clip-padding transition ease-in-out mt-8 shadow rounded border border-gray-400 w-81 h-14 py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:border-blue-900 focus:ring-blue-600"
            type="Password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-between">
            <button
              onClick={handleSignIn}
              value={stateLoading ? "Loading..." : "Sign in"}
              disabled={stateLoading}
              className="mt-8 active:bg-blue-700 bg-blue-500 text-white py-2 px-3 rounded "
            >
              Sign In
            </button>
            <Link to="/forgotpassword" className="mt-8 py-2  hover:underline">
              Forgot Password?
            </Link>
          </div>
          <SignInModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            messageAlert={messageAlert}
          />
        </form>
      </div>
    </div>
  );
}

export default SignIn;


