import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./signin.css";
import SignInImg from "../images/SignIn.png";
import SignInImg1 from "../images/SignIn1.png";
import NextDay from "../images/Logo Nextday.png";
const SignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showSmsCode, setShowSmsCode] = useState(false);
  if(showSmsCode){
    const signUpButton = document.querySelectorAll('.signUpButton');;
    signUpButton.forEach(button => {
      button.classList.add('adjustedButtonStyle');
    });

  }
  console.log(showSmsCode);
  console.log(phoneNumber);
  return (
    <div>
      <div class="grid grid-cols-2">
        <div class="flex flex-col mt-100px ml-100px grid-col-1 col1">
          <div
            class="font-sf-ui-text text-2xl font-semibold leading-normal tracking-tight text-left mainHeading"
            style={{ marginLeft: "2rem" }}
          >
            Welcome Back
          </div>
          {showSmsCode == false ? (
            <>
              <div
                class="text-dark text-sf-ui-text text-left phoneNumber"
                style={{ marginTop: "2rem" }}
              >
                Phone Number
              </div>
              <div class="w-326 h-50 flex-shrink-0 mt-4 enterPhoneNumber">
                <input
                  type="text"
                  name="price"
                  id="price"
                  class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Enter Phone Number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </>
          ) : (
            <></>
          )}
          {showSmsCode == true ? (
            <>
              <div
                class="text-dark text-sf-ui-text text-left enterCode"
                style={{ marginTop: "2rem" }}
              >
                Enter Code
              </div>
              <div class="w-326 h-50 flex-shrink-0 mt-4 enterCodeInput">
                <input
                  type="text"
                  name="price"
                  id="price"
                  class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Enter Code Here "
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </>
          ) : (
            <></>
          )}
          {phoneNumber.length !== 0 ? (
            <button className="signUpButton">
              {showSmsCode == false ? (
                <Link to="" onClick={() => setShowSmsCode(true)}>
                  SMS Code
                </Link>
              ) : (
                <Link to="">Confirm</Link>
              )}
            </button>
          ) : (
            <button className="signUpButtonGrey">
              <Link to="" style={{fontSize: '16px'}}>SMS Code</Link>
            </button>
          )}
          {showSmsCode == false ? (
            <>
              <div className="otherAccount">
                Don't you have another account?
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="grid-col-2 col2 phoneLogoMain">
          <div className="phoneLogo">
            <img src={SignInImg} className="signInImg" />
            <img src={SignInImg1} className="signInImg1" />
          </div>
          <div className="nextDayPosition">
            <img src={NextDay} className="NextDayLogo" />
            <div className="mealNextDay">Meals at your fingertips</div>
            <div className="mealNextDayDesc">
              With our website you can view menus, select meals and see your
              scheduled deliveries
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
