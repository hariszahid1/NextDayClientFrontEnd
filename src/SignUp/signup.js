import React, { useState, useRef } from "react";
import GoogleMaps from "../components/googleMaps/googleMaps";
import "./signup.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div className="mainContainer">
      <div class="grid grid-cols-2 registerWeb">
        <div class="flex flex-col mt-100px ml-100px">
          <div class="font-sf-ui-text text-2xl font-semibold leading-normal tracking-tight text-left getStarted">
            Get Started
          </div>
          <div class="text-dark text-sf-ui-text text-left">
            Please add your address
          </div>
          <div class="w-326 h-50 flex-shrink-0 mt-4">
            <input
              type="text"
              name="price"
              id="price"
              class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder=""
              onChange={(e) => setSelectedLocation(e.target.value)}
            />
          </div>
          <button className="signUpButton">
            <Link to="/selectplan"> Get Started</Link>
          </button>
        </div>

        <GoogleMaps />
      </div>
      <div class="grid grid-rows-2 registerMobile flex:lg lg:hidden">
        <div class="flex flex-col getStarted">
          <div class="font-sf-ui-text text-2xl font-semibold leading-normal tracking-tight text-left getStarted">
            Get Started
          </div>
          <div class="text-dark text-sf-ui-text text-left addressText">
            Please add your address
          </div>
          <div class="h-50 flex-shrink-0 mt-4 addressInput">
            <input
              type="text"
              name="price"
              id="price"
              class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Deliver To"
              onChange={(e) => setSelectedLocation(e.target.value)}
            />
          </div>
          <button className="signUpButtonMobile">
            <Link to="/selectplan"> Get Started</Link>
          </button>
        </div>
        <div className="googleMapsMobile">

        <GoogleMaps />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
