import React from "react";
import Signin from "./SignIn-SignUp/SignIn";
import SignUp from "./SignIn-SignUp/SignUp";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import guitar from "../../img/guitar_homepage.jpg";
function HomePage() {
  const [tabState, setTabState] = React.useState("signin");
  const statusTab = (index) => {
    setTabState(index);
  };
  return (
    <React.Fragment>
      <div className="flex lg:grid lg:grid-cols-2 min-h-screen bg-gray-100">
        <div className="flex flex-col xl:flex-row justify-center items-center">
          <div className="flex justify-center items-center p-4">
            <ul className="flex flex-row xl:flex-col">
              <li className="mr-2 xl:mb-2">
                <button
                  className={
                    tabState === "signin"
                      ? "w-16 h-16 text-4xl items-center text-center block border bg-blue-700 rounded-lg py-2 px-4  "
                      : "transition duration-500 ease-in-out w-16 h-16 text-4xl items-center text-center block border bg-gray-200 border-gray-200 rounded-lg  hover:bg-blue-700 py-2 px-4"
                  }
                  onClick={() => statusTab("signin")}
                >
                  <FaSignInAlt />
                </button>
              </li>
              <li className="xl:mt-2">
                <button
                  className={
                    tabState === "signup"
                      ? "w-16 h-16 text-4xl items-center text-center block border bg-red-700 rounded-lg py-2 px-4  "
                      : "transition duration-500 ease-in-out w-16 h-16 text-4xl items-center text-center block border bg-gray-200 border-gray-200 rounded-lg hover:bg-red-700 py-2 px-4"
                  }
                  onClick={() => statusTab("signup")}
                >
                  <FaUserPlus />
                </button>
              </li>
            </ul>
          </div>

          <div className={tabState === "signin" ? "visible" : "hidden"}>
            <Signin />
          </div>
          <div className={tabState === "signup" ? "visible" : "hidden"}>
            <SignUp />
          </div>
        </div>
        <div
          className="bg-no-repeat bg-cover bg-center invisible lg:visible"
          style={{ backgroundImage: `url(${guitar})`, opacity: 0.75 }}
        >
          <div className="flex flex-col h-screen justify-center items-center text-center font-thin  text-white select-none">
            <span className="text-5xl pb-2">GuitarKe</span>
            <span className="text-2xl pt-2">
              Karaoke-like Lyrics with Guitar Chords Web Application
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default HomePage;
