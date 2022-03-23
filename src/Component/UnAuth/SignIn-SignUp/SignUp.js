import React, { useState } from "react";
import axios from "axios";
import SignUpModal from "./SignUpModal";
function SignUp() {
  const [stateLoading, setStateLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [messageAlert, setMessageAlert] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleSignUp = () => {
    setStateLoading(true);
    axios
      .post("http://localhost:5000/signup", {
        email: email,
        username: username,
        password: password,
        confirmpassword: confirmpassword,
      })
      .then((response) => {
        setStateLoading(false);
        setIsOpen(true);
        setMessageAlert("Success");
      })
      .catch((error) => {
        setStateLoading(false);
        if (error.response.status === 400 || error.response.status === 401) {
          setIsOpen(true);
          setMessageAlert(error.response.data.message);
        } else {
          setIsOpen(true);
          setMessageAlert("Something Wrong Please Try Again");
        }
      });
  };
  return (
    <div className="flex items-center justify-center">
      <div className="py-12 bg-white flex flex-col justify-center items-center shadow-md rounded-lg">
        <h1 className="font-bold text-5xl ">Sign Up</h1>
        <form className="px-5 flex flex-col">
          <input
            className="bg-clip-padding transition ease-in-out mt-16 shadow rounded border border-gray-400 w-81 h-14 py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:border-red-900 focus:ring-red-600"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="bg-clip-padding transition ease-in-out mt-8 shadow rounded border border-gray-400 w-81 h-14 py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:border-red-900 focus:ring-red-600"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="bg-clip-padding transition ease-in-out mt-8 shadow rounded border border-gray-400 w-81 h-14 py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:border-red-900 focus:ring-red-600"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="bg-clip-padding transition ease-in-out mt-8 shadow rounded border border-gray-400 w-81 h-14 py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:border-red-900 focus:ring-red-600"
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="flex justify-center mt-5">
            <button
              onClick={handleSignUp}
              value={stateLoading ? "Loading..." : "Sign Up"}
              disabled={stateLoading}
              className="mt-2 bg-red-500 active:bg-red-700 py-2 px-3 rounded focus:outline-none focus:shadow-outline text-white  "
            >
              Sign Up
            </button>
          </div>
          <SignUpModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            messageAlert={messageAlert}
          />
        </form>
      </div>
    </div>
  );
}

export default SignUp;
