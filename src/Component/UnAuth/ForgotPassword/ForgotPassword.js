import React from "react";
import ForgotPasswordModal from "./ForgotPasswordModal";
function ForgotPassowrd() {
  const [email_username, setEmail_Username] = React.useState("");
  const [new_password, setNew_Password] = React.useState("");
  const [confirmpassword, setConfirmPassword] = React.useState("");
  return (
    <React.Fragment>
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className=" py-12 w-auto h-auto bg-white flex flex-col justify-center items-center shadow-md rounded-lg">
          <h1 className="font-bold text-5xl ">Forget Password?</h1>
          <div className="px-10 flex flex-col">
            <input
              className="bg-clip-padding transition ease-in-Wout mt-16 shadow rounded border border-gray-400 w-81 h-14 py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:border-blue-900  focus:ring-blue-600"
              type="text"
              placeholder="Email/Username"
              onChange={(e) => setEmail_Username(e.target.value)}
            />
            <input
              className="bg-clip-padding transition ease-in-out mt-8 shadow rounded border border-gray-400 w-81 h-14 py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:border-blue-900  focus:ring-blue-600"
              type="password"
              placeholder="Password"
              onChange={(e) => setNew_Password(e.target.value)}
            />
            <input
              className="bg-clip-padding transition ease-in-out mt-8 shadow rounded border border-gray-400 w-81 h-14 py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:border-blue-900  focus:ring-blue-600"
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <ForgotPasswordModal
              email_username={email_username}
              new_password={new_password}
              confirmpassword={confirmpassword}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ForgotPassowrd;
