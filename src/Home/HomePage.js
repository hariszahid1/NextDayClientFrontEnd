import React from "react";
import HomepageImg from "../images/HomepageImg.png";
import "./homepage.css";
import Selection from "../images/selection.png";
import Cooking from "../images/cooking.png";
import Cutlery from "../images/cutlery.png";
import Rectangle1 from "../images/Rectangle1.png";
import Rectangle2 from "../images/Rectangle2.png";
import Rectangle3 from "../images/Rectangle3.svg";
import Rectangle4 from "../images/Rectangle4.svg";
import Rectangle5 from "../images/Rectangle5.svg";
import Rectangle6 from "../images/Rectangle6.svg";
import iconClock from "../images/icon _Clock.png";
import signUpSection from "../images/SignupSection.png";
import Eats1 from "../images/Eats1.png";
import Eats2 from "../images/Eats2.png";
import Eats3 from "../images/Eats3.png";
import Eats4 from "../images/Eats4.png";
import FooterMobile from "../images/footerMobile.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ImageMobile from "../images/HeroImageMobile.png";
import { useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
const Homepage = () => {
  const containerRef = useRef(null);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleTouchStart = (event) => {
    const initialX = event.touches[0].clientX;
    setStartX(initialX);
  };

  const handleTouchMove = (event) => {
    if (!startX) return;

    const currentX = event.touches[0].clientX;
    const deltaX = startX - currentX;
    setScrollLeft((prevScrollLeft) => prevScrollLeft + deltaX);
    setStartX(currentX);
  };

  const handleTouchEnd = () => {
    setStartX(null);
  };


  return (
    <div>
      <img src={HomepageImg} className="homeSectionCook" />
      <img
        src={ImageMobile}
        className="homeSectionMobile lg:hidden md:hidden"
      />
      <div className="healthMealBox">
        <span>
          We cook <span>healthy</span> meals for busy People
        </span>
        <button className="healthMealBoxButton">Get Started</button>
      </div>
      <div className="grid grid-rows-2 workSection">
        <div className="grid-row-1 flex justify-center mt-10 workText">
          How it works
        </div>
        <div className="grid grid-cols-6 workSection2">
          <div className="grid grid-col-1"></div>
          <div className="grid grid-col-2">
            <div className="grid grid-rows-3">
              <div className="grid grid-row-1">
                <img src={Selection} style={{ marginLeft: "2rem" }} />
              </div>
              <div className="grid grid-row-2 selectMeal">
                Select your meals
              </div>
              <div className="grid grid-row-2 healthySection">
                Weekly healthy & very delicious menu
              </div>
            </div>
          </div>
          <div className="grid grid-col-3"></div>
          <div
            className="grid grid-col-4 healthySectionDeliver"
            style={{ position: "relative", right: "60px" }}
          >
            <div className="grid grid-rows-3">
              <div className="grid grid-row-1">
                <img src={Cooking} style={{ marginLeft: "2rem" }} />
              </div>
              <div className="grid grid-row-2 selectMeal">
                We cook and Deliver
              </div>
              <div className="grid grid-row-2 healthySection">
                Fully cooked meals, sent fresh
              </div>
            </div>
          </div>
          <div className="grid grid-col-5"></div>
          <div
            className="grid grid-col-6 heatEat "
            style={{ position: "relative", right: "130px" }}
          >
            <div className="grid grid-rows-3">
              <div className="grid grid-row-1">
                <img src={Cutlery} style={{ marginLeft: "2rem" }} />
              </div>
              <div className="grid grid-row-2 selectMeal">
                Heat, Eat, and Enjoy
              </div>
              <div className="grid grid-row-2 healthySection">
                Refregirate meals, & re-heat in 3 minutes
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-rows-3 workTextMain">
        <div className="grid-row-1 flex justify-center workText ">
          {" "}
          The Menu
        </div>
        <div className="grid-row-2 flex justify-center theMenuDesc ">
          {" "}
          Quality Meals made from Healthy ingredients, crafted by expert chefs
        </div>
      </div>
      <div className="menuFlex">
        <div className="grid sm:grid-cols-2 sm:grid-rows-3 lg:grid-rows-1 lg:grid-cols-6 ">
          <div
            style={{ padding: "10px" }}
            className="sm:col-span-1 sm:row-span-1"
          >
            <img src={Rectangle1} />
            <div
              style={{
                position: "absolute",
                width: "153px",
                color: "white",
                bottom: "20px",
                marginLeft: "10px",
              }}
              className="menuText"
            >
              Tuna and Vegetable Casserole
            </div>
          </div>
          <div
            style={{ padding: "10px" }}
            className="sm:col-span-1 sm:row-span-1"
          >
            <img src={Rectangle2} />
            <div
              style={{
                position: "absolute",
                width: "126px",
                color: "white",
                bottom: "20px",
                marginLeft: "10px",
              }}
              className="menuText"
            >
              Tikka masala shrimp skewers
            </div>
          </div>
          <div className="" style={{ padding: "10px" }}>
            <img src={Rectangle3} />
            <div
              style={{
                position: "absolute",
                width: "146px",
                color: "white",
                bottom: "20px",
                marginLeft: "10px",
              }}
              className="menuText"
            >
              Chicken with lemon and rosemary
            </div>
          </div>
          <div className="" style={{ padding: "10px" }}>
            <img src={Rectangle4} />
            <div
              style={{
                position: "absolute",
                width: "102px",
                color: "white",
                bottom: "20px",
                marginLeft: "10px",
              }}
              className="menuText"
            >
              Date-Glazed Lamb Shoulder
            </div>
          </div>
          <div className="" style={{ padding: "10px" }}>
            <img src={Rectangle5} />
            <div
              style={{
                position: "absolute",
                width: "103px",
                color: "white",
                bottom: "30px",
                marginLeft: "25px",
              }}
              className="menuText"
            >
              Lamb kozzi
            </div>
          </div>
          <div className="" style={{ padding: "10px" }}>
            <img src={Rectangle6} />
            <div
              style={{
                position: "absolute",
                width: "103px",
                color: "white",
                bottom: "30px",
                marginLeft: "25px",
              }}
              className="menuText"
            >
              Beef Stew
            </div>
          </div>
        </div>
      </div>
      <div className="foodFacts">
        <h4 className="flex justify-center">Food Facts</h4>
        <div className="grid lg:grid-rows-2 sm:grid-rows-5">
          <div
            className="grid lg:grid-row-1"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "100px",
            }}
          >
            <div className="grid lg:grid-cols-3">
              <div className=" grid lg:grid-col-1">
                <div className="fourHundred">400+</div>
                <div>
                  <img
                    src={iconClock}
                    style={{
                      position: "relative",
                      width: "54px",
                      height: "54px",
                      left: "18rem",
                      bottom: "4rem",
                    }}
                  />
                </div>
                <div className="fourDesc">
                  On average, People spend more than 400 hours in the kitchen
                  annually
                </div>
                <svg
                  width="312"
                  height="2"
                  viewBox="0 0 312 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0.5 1H312" stroke="#C4C4C4" stroke-width="0.3" />
                </svg>
              </div>

              <div className="grid lg:grid-col-2">
                <div className="fourHundred">54%</div>
                <div
                  style={{
                    position: "relative",
                    width: "54px",
                    height: "54px",
                    left: "18rem",
                    bottom: "4rem",
                  }}
                >
                  <svg
                    width="52"
                    height="39"
                    viewBox="0 0 52 39"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M50.375 32.5H6.5V1.625C6.5 0.727188 5.77281 0 4.875 0H1.625C0.727188 0 0 0.727188 0 1.625V35.75C0 37.5446 1.45539 39 3.25 39H50.375C51.2728 39 52 38.2728 52 37.375V34.125C52 33.2272 51.2728 32.5 50.375 32.5ZM47.125 3.25H35.1345C32.9631 3.25 31.8754 5.87539 33.411 7.41102L36.7016 10.7016L29.25 18.1543L21.7984 10.7027C20.5288 9.43313 18.4712 9.43313 17.2027 10.7027L10.2263 17.679C9.59156 18.3138 9.59156 19.3426 10.2263 19.9773L12.5237 22.2747C13.1584 22.9095 14.1873 22.9095 14.822 22.2747L19.5 17.5957L26.9516 25.0473C28.2212 26.3169 30.2788 26.3169 31.5473 25.0473L41.2973 15.2973L44.588 18.588C46.1236 20.1236 48.749 19.0359 48.749 16.8645V4.875C48.75 3.97719 48.0228 3.25 47.125 3.25Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <div className="fourDesc">
                  Home eating increased due to the pandemic
                </div>
                <svg
                  width="312"
                  height="2"
                  viewBox="0 0 312 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0.5 1H312" stroke="#C4C4C4" stroke-width="0.3" />
                </svg>
              </div>
              <div className="grid lg:grid-col-3">
                <div className="fourHundred">29%</div>
                <div
                  style={{
                    position: "relative",
                    width: "54px",
                    height: "54px",
                    left: "18rem",
                    bottom: "4rem",
                  }}
                >
                  <svg
                    width="66"
                    height="66"
                    viewBox="0 0 66 66"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M55.1644 45.4939H54.666V53.0113H59.6538V49.9833C59.6539 47.5079 57.64 45.4939 55.1644 45.4939Z"
                      fill="black"
                    />
                    <path
                      d="M50.7991 41.6663C50.7991 38.8328 48.5042 36.5276 45.6834 36.5276H37.8736C35.0527 36.5276 32.7578 38.8328 32.7578 41.6663V53.0113H50.799V41.6663H50.7991Z"
                      fill="black"
                    />
                    <path
                      d="M24.0605 49.9833V53.0113H28.8905V45.4939H28.55C26.0746 45.4939 24.0605 47.5079 24.0605 49.9833Z"
                      fill="black"
                    />
                    <path
                      d="M6.72014 38.4414C5.1471 38.4414 3.86719 37.1547 3.86719 35.5729C3.86719 33.9911 5.1471 32.7043 6.72014 32.7043H7.29132V28.8372H6.72014C3.01473 28.8372 0 31.8587 0 35.5729C0 39.2871 3.01473 42.3086 6.72014 42.3086H7.29132V38.4414H6.72014Z"
                      fill="black"
                    />
                    <path
                      d="M20.1926 49.9834C20.1926 45.3755 23.9413 41.6268 28.5492 41.6268H28.8907C28.9122 36.6793 32.9327 32.6605 37.8726 32.6605H39.844V17.3535H11.1582V44.6983C11.1582 49.2822 14.8725 53.0114 19.4381 53.0114H20.1926V49.9834Z"
                      fill="black"
                    />
                    <path
                      d="M61.4272 65.4797L66 60.7778V57.0271H0V60.9122L4.43837 65.4797H61.4272Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <div className="fourDesc">
                  Of the time is spent on preparing breakfast
                </div>
                <svg
                  width="312"
                  height="2"
                  viewBox="0 0 312 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0.5 1H312" stroke="#C4C4C4" stroke-width="0.3" />
                </svg>
              </div>
            </div>
          </div>
          <div
            className="grid lg:grid-row-2"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <div className="grid lg:grid-cols-3">
              <div className="grid lg:grid-col-1">
                <div className="fourHundred">21%</div>
                <div
                  style={{
                    position: "relative",
                    width: "54px",
                    height: "54px",
                    left: "18rem",
                    bottom: "4rem",
                  }}
                >
                  <svg
                    width="52"
                    height="52"
                    viewBox="0 0 52 52"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M46.6232 13.0874C46.7544 13.8508 46.839 14.3437 46.8604 14.3989C50.8506 24.5789 51.717 40.8015 51.0486 48.5598C50.9781 49.3033 50.6336 49.9939 50.0821 50.4974C49.5307 51.0009 48.8117 51.2814 48.0649 51.2841H3.10059C2.32856 51.2857 1.5857 50.9893 1.02683 50.4567C0.467968 49.9241 0.136217 49.1963 0.100725 48.4251C-0.326453 39.2474 0.400952 25.905 6.31646 14.444C6.88863 13.3358 7.2382 12.0825 7.53903 9.63557C7.61565 9.0177 7.69103 8.34251 7.76833 7.65017C8.00482 5.53187 8.25925 3.25299 8.62201 1.96382C8.79252 1.37675 9.16812 0.87042 9.68048 0.536954C10.1928 0.203489 10.8079 0.0650307 11.4137 0.146803C11.996 0.232801 12.54 0.488294 12.978 0.881437C13.0777 0.966108 13.2055 1.0103 13.3362 1.00529C13.4668 1.00027 13.5909 0.946409 13.6838 0.854368C13.9641 0.577711 14.297 0.359876 14.6628 0.213682C15.0285 0.0674721 15.4198 -0.00415269 15.8136 0.00301894C16.555 -0.0153374 17.2782 0.233442 17.8514 0.703947C17.9465 0.781416 18.0651 0.824323 18.1877 0.825635C18.3104 0.826948 18.4298 0.786588 18.5265 0.711164C18.9875 0.326032 19.569 0.11482 20.1696 0.114317C20.9102 0.0952431 21.6283 0.36894 22.1683 0.87602C22.2652 0.959287 22.3892 1.00418 22.517 1.00218C22.6447 1.00018 22.7672 0.951444 22.8615 0.865186C23.1725 0.573743 23.5387 0.347349 23.9384 0.199293C24.3381 0.051252 24.7634 -0.01549 25.1893 0.00301894C25.9754 -0.0255455 26.7484 0.210218 27.3847 0.672666C27.4683 0.736524 27.5693 0.773389 27.6743 0.778333C27.7793 0.783277 27.8834 0.756071 27.9725 0.70033C28.5525 0.30113 29.2335 0.0741859 29.937 0.0457283C30.5591 0.0481087 31.162 0.262205 31.6463 0.652799C31.8217 0.800565 32.0453 0.878614 32.2746 0.872068C32.5038 0.865522 32.7226 0.774839 32.8893 0.617307C33.3893 0.207075 34.0201 -0.00967637 34.6666 0.00662002C35.3384 0.0216347 35.9796 0.290311 36.4613 0.758695C36.5602 0.824232 36.677 0.85745 36.7955 0.853788C36.9141 0.850126 37.0285 0.809751 37.1232 0.738248C37.393 0.464628 37.7225 0.257063 38.0858 0.131773C38.456 0.0362373 38.8447 0.0384041 39.2138 0.138059C39.5829 0.237714 39.9198 0.431455 40.1916 0.70033C40.2741 0.786771 40.3855 0.839826 40.5045 0.849363C40.6236 0.858915 40.742 0.824277 40.8372 0.752073C41.0807 0.548566 41.3646 0.399 41.6701 0.31323C41.9756 0.22746 42.2959 0.207441 42.6097 0.254514C43.3912 0.471098 43.8359 1.39766 44.1529 2.05948C45.05 3.92819 46.1453 10.3047 46.6232 13.0874ZM24.8355 29.3296L27.4401 26.7251V26.7281C27.5239 26.6443 27.5904 26.5448 27.6358 26.4353C27.6812 26.3258 27.7046 26.2084 27.7046 26.0899C27.7046 25.9714 27.6813 25.854 27.636 25.7445C27.5906 25.635 27.5242 25.5355 27.4404 25.4517C27.3566 25.3678 27.2571 25.3013 27.1476 25.2559C27.0381 25.2106 26.9208 25.1872 26.8022 25.1871C26.6837 25.1871 26.5663 25.2104 26.4568 25.2558C26.3473 25.3011 26.2478 25.3676 26.164 25.4514L23.5594 28.0565C23.4497 28.182 23.3154 28.2836 23.1649 28.3551C23.0143 28.4265 22.8507 28.4662 22.6841 28.4717C22.5175 28.4772 22.3516 28.4485 22.1966 28.3872C22.0417 28.3259 21.9009 28.2334 21.7832 28.1155C21.6655 27.9975 21.5732 27.8566 21.5122 27.7016C21.4512 27.5465 21.4227 27.3805 21.4286 27.214C21.4344 27.0474 21.4744 26.8838 21.546 26.7334C21.6177 26.5829 21.7196 26.4488 21.8453 26.3394L24.4504 23.7348C24.5366 23.6516 24.6054 23.552 24.6527 23.4419C24.7 23.3318 24.7249 23.2133 24.7259 23.0935C24.727 22.9737 24.7041 22.8548 24.6588 22.7439C24.6134 22.633 24.5464 22.5323 24.4616 22.4475C24.3769 22.3628 24.2761 22.2958 24.1652 22.2504C24.0543 22.205 23.9355 22.1822 23.8156 22.1832C23.6958 22.1843 23.5774 22.2092 23.4673 22.2565C23.3572 22.3038 23.2576 22.3725 23.1743 22.4587L20.5691 25.0639C20.1002 25.5266 19.7907 26.1265 19.6855 26.7768C19.5802 27.4271 19.6847 28.0941 19.9837 28.6811C19.9837 28.6811 18.8195 29.8597 18.8063 29.8741C18.6459 29.8649 18.485 29.8673 18.325 29.8814L17.2775 28.8315C17.3499 28.6833 17.4085 28.5289 17.4526 28.37C17.6536 27.6221 17.6468 26.8335 17.4329 26.0892C17.2191 25.3449 16.8063 24.6729 16.239 24.1458C15.6381 23.5715 14.9023 23.1577 14.0995 22.9424C13.557 22.801 12.9869 22.8039 12.4458 22.9508C11.9047 23.0977 11.4115 23.3835 11.0149 23.7798C10.6184 24.1762 10.3323 24.6693 10.1852 25.2104C10.0381 25.7514 10.0349 26.3215 10.1761 26.864C10.392 27.6672 10.8069 28.4031 11.3824 29.0036C11.9078 29.5731 12.5796 29.9875 13.3244 30.2014C14.0692 30.4153 14.8585 30.4205 15.6061 30.2165C15.7333 30.1821 15.8578 30.1383 15.9785 30.0853L16.8665 30.9776L12.8396 35.0045C12.6956 35.1454 12.581 35.3135 12.5024 35.4991C12.4238 35.6846 12.3828 35.8839 12.3818 36.0854C12.3807 36.2869 12.4196 36.4866 12.4962 36.673C12.5728 36.8594 12.6856 37.0287 12.8281 37.1712C12.9706 37.3136 13.1399 37.4264 13.3263 37.5031C13.5126 37.5797 13.7124 37.6186 13.9138 37.6175C14.1153 37.6164 14.3146 37.5754 14.5002 37.4968C14.6857 37.4182 14.8538 37.3036 14.9948 37.1596L18.6047 33.5497L22.2568 37.2017C22.5428 37.4877 22.9307 37.6483 23.3352 37.6483C23.7396 37.6482 24.1275 37.4875 24.4134 37.2014C24.6994 36.9154 24.86 36.5275 24.8599 36.1231C24.8599 35.7186 24.6992 35.3307 24.4131 35.0448L20.293 30.9252L21.2737 29.9445C21.6846 30.151 22.1375 30.2604 22.5973 30.264C23.0135 30.2631 23.4254 30.1801 23.8095 30.0198C24.1935 29.8594 24.5422 29.6249 24.8355 29.3296ZM26.2098 24.5919C26.2098 24.3526 26.1148 24.1231 25.9456 23.9538C25.7763 23.7846 25.5468 23.6896 25.3075 23.6896C25.0682 23.6896 24.8387 23.7846 24.6694 23.9538L23.0293 25.5934C22.9431 25.6766 22.8744 25.7762 22.8271 25.8863C22.7798 25.9964 22.7549 26.1148 22.7538 26.2346C22.7528 26.3545 22.7756 26.4733 22.821 26.5842C22.8664 26.6951 22.9334 26.7959 23.0181 26.8807C23.1029 26.9654 23.2036 27.0324 23.3146 27.0778C23.4255 27.1232 23.5443 27.146 23.6641 27.1449C23.784 27.1439 23.9024 27.119 24.0125 27.0717C24.1226 27.0244 24.2222 26.9557 24.3054 26.8695L25.9456 25.2299C26.1148 25.0607 26.2098 24.8312 26.2098 24.5919ZM28.6688 10.2357C28.8598 10.1561 29.0332 10.0395 29.1789 9.89247C29.3243 9.74719 29.4395 9.57458 29.518 9.3846C29.5965 9.19461 29.6366 8.99098 29.6361 8.78541C29.6371 8.74722 29.6351 8.709 29.6301 8.67111C29.6026 8.27528 29.4258 7.90468 29.1353 7.63434C28.8449 7.36401 28.4626 7.21414 28.0658 7.21509H19.6967C19.4906 7.21431 19.2864 7.2549 19.0962 7.33447C18.9061 7.41406 18.7338 7.53099 18.5897 7.67837C18.3193 7.94102 18.1563 8.29489 18.1324 8.67111C18.1274 8.709 18.1254 8.74722 18.1264 8.78541C18.1267 9.2018 18.2923 9.60103 18.5867 9.89546C18.8811 10.1899 19.2804 10.3554 19.6967 10.3557H28.0658C28.2728 10.356 28.4777 10.3152 28.6688 10.2357ZM48.8644 49.1705C49.0836 48.9719 49.2211 48.6989 49.2502 48.4046C49.9319 40.5157 48.8958 24.538 45.1812 15.0559C44.9159 14.0725 44.7292 13.0696 44.6228 12.0566L44.6223 12.053C44.1969 9.23361 43.5545 4.9754 42.5285 2.83923C42.5052 2.77296 42.4635 2.71477 42.4081 2.67157C42.3527 2.62837 42.2861 2.60199 42.2162 2.59556C41.8502 2.67424 41.5218 2.87494 41.2848 3.16473C41.1758 3.27066 41.1113 3.41417 41.1043 3.56604C41.1175 5.79841 40.7092 9.74557 40.5046 11.7234L40.5027 11.742C40.3751 12.9122 40.0789 14.0578 39.6231 15.1431C35.0745 26.1029 35.918 44.0233 36.258 48.9882C36.2675 49.1222 36.3276 49.2475 36.4262 49.3387C36.5248 49.4299 36.6544 49.4801 36.7886 49.4792H48.0643C48.3601 49.4791 48.6453 49.3691 48.8644 49.1705ZM10.0141 14.1089H36.5069C36.7151 14.1089 36.9147 14.0262 37.0619 13.879C37.2091 13.7318 37.2918 13.5322 37.2918 13.324C37.2918 13.1159 37.2091 12.9163 37.0619 12.7691C36.9147 12.6219 36.7151 12.5392 36.5069 12.5392H10.0141C9.80592 12.5392 9.60629 12.6219 9.4591 12.7691C9.31191 12.9163 9.22922 13.1159 9.22922 13.324C9.22922 13.5322 9.31191 13.7318 9.4591 13.879C9.60629 14.0262 9.80592 14.1089 10.0141 14.1089Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <div className="fourDesc">
                  of the time is spent on preparing Lunch
                </div>
                <svg
                  width="312"
                  height="2"
                  viewBox="0 0 312 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0.5 1H312" stroke="#C4C4C4" stroke-width="0.3" />
                </svg>
              </div>
              <div className="grid lg:grid-col-2">
                <div className="fourHundred">23%</div>
                <div
                  style={{
                    position: "relative",
                    width: "54px",
                    height: "54px",
                    left: "18rem",
                    bottom: "4rem",
                  }}
                >
                  <svg
                    width="61"
                    height="44"
                    viewBox="0 0 61 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M46.3577 4.26601H33.3276C34.5049 4.26601 35.4624 3.30858 35.4624 2.12954C35.4624 0.950503 34.5032 0 33.3276 0H27.9986C26.8213 0 25.8656 0.950503 25.8656 2.12954C25.8656 3.30858 26.823 4.26601 27.9986 4.26601H14.9669C11.3414 4.26601 8.33932 7.51572 7.75586 10.9749H53.5738C52.9869 7.51399 49.9848 4.26601 46.3577 4.26601Z"
                      fill="black"
                    />
                    <path
                      d="M53.68 14.6368V14.0273H7.75464H7.6473H0V17.078H7.6473V35.9806C7.6473 40.0285 10.9264 43.3024 14.9674 43.3024H46.3599C50.4043 43.3024 53.6817 40.0285 53.6817 35.9806V17.6874H61.0035V14.6368H53.68Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <div className="fourDesc">
                  of the time is spent on preparing Dinner{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="whatsCooking">
        <div className="grid grid-rows-2">
          <div className="grid grid-row-1 flex ">
            <div className="whatCookingHeading">See What's Cooking</div>
            <div className="whatCookingTag">
              Share your favorite mealtime moment with us. #proeats
            </div>
          </div>
          <div
            className="swipeable-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              // overflowX: "scroll",
              whiteSpace: "nowrap",
              WebkitOverflowScrolling: "touch",
              width: "100%", // Ensure the container takes up the full width
              height: "auto", // Adjust height as needed
              padding: "20px", // Add padding or adjust as per your design
            }}
          >
            <div
              className="grid-row-2 flex justify-center"
              ref={containerRef}
              style={{
                display: "flex",
                alignItems: "center",
                transform: `translateX(-${scrollLeft}px)`,
              }}
            >
              <div className="flex" style={{ display: "flex", gap: "1rem" }}>
                <div className="cardDesign">
                  <img
                    src={Eats1}
                    style={{ width: "221px", height: "226px" }}
                  />
                  <div className="cardDesignHeading">@Thamershabibi</div>
                  <div className="cardDesignDesc">
                    #viral #surfnturf #reels #seafood #reelsinstagram
                    #reelsvideo #reelsviral
                  </div>
                </div>
                <div className="cardDesign">
                  <img
                    src={Eats2}
                    style={{ width: "221px", height: "226px" }}
                  />
                  <div className="cardDesignHeading">@AbdulRahman</div>
                  <div className="cardDesignDesc">
                    #viral #surfnturf #reels #seafood #reelsinstagram
                    #reelsvideo #reelsviral
                  </div>
                </div>
                <div className="cardDesign">
                  <img
                    src={Eats3}
                    style={{ width: "221px", height: "226px" }}
                  />
                  <div className="cardDesignHeading">@customername</div>
                  <div className="cardDesignDesc">
                    #viral #surfnturf #reels #seafood #reelsinstagram
                    #reelsvideo #reelsviral
                  </div>
                </div>
                <div className="cardDesign">
                  <img
                    src={Eats4}
                    style={{ width: "221px", height: "226px" }}
                  />
                  <div className="cardDesignHeading">@customername</div>
                  <div className="cardDesignDesc">
                    #viral #surfnturf #reels #seafood #reelsinstagram
                    #reelsvideo #reelsviral
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Faq">
        <div className="faqHeading">FAQs</div>
        <div
          className="faqQuestion"
          style={{ marginTop: "8rem", fontWeight: "600 !important" }}
        >
          How do i eat Pro Eats
        </div>
        <div className="faqAnswer">
          Very easily. Pro Eats meals arrive fully cooked. When you’re ready to
          eat, simply put your meals in the microwave for 2 – 3 mins, peel off
          plastic seal – and eat! If you prefer the more traditional cooking
          method, you’re welcome to heat them in a conventional oven for 10-15
          mins before eating and then plating.
        </div>
        <div className="faqQuestion" style={{paddingTop: '70px'}}>How long do my meals last?</div>
        <div className="faqAnswer" style={{ height: "90px" }}>
          Each meal will have its own ‘use by’ date on the front of the packet.
          Be sure to check it as soon they arrive so you can enjoy each one at
          its freshest!
        </div>
        <div className="faqQuestion">Can I choose the meals i want?</div>
        <div className="faqAnswer" style={{ height: "90px" }}>
          Yes. You can select the exact meals you want delivered each week.
          Every Week you’ll receive an email reminder to go to your dashboard
          and pick your meals.
        </div>
        <div className="faqQuestion">Where do you deliver?</div>
        <div className="faqAnswer" style={{ height: "90px" }}>
          We can deliver to any address in all Saudi arabia cities to Homes,
          hotels, office, gym, campus – anywhere.
        </div>
        <div className="faqQuestion">When do meals arrive? </div>
        <div className="faqAnswer" style={{ height: "90px" }}>
          Your healthy prepared meals arrive on your doorstep every Friday. You
          can adjust to a later day if you prefer.{" "}
        </div>
      </div>
      <br />

      <div className="SignUpSection">
        <img src={signUpSection} />
      </div>
      <div className="footerMobile lg:hidden">
        <img src={FooterMobile} style={{width: '100%'}}/>
        <div className="footerMobileBanner">
              <div className="footerBannerMain">Ready-made Meals Start at 29,0 SAR per meal</div>
              <div className="footerBannerDesc">Get fully-prepared, gourmet meals delivered to your doorstep.</div>
              <button className="footerBannerButton">Get Started</button>

        </div>
      </div>
      <div className="homeFooter">
        <div>FAQ</div>
        <div>Plans and Menu</div>
        <div>Company</div>
        <div>Contact Us</div>
      </div>
      <div className="socialIcons">
        <FacebookIcon />
        <LinkedInIcon />
        <TwitterIcon />
        <YouTubeIcon />
      </div>
      <div className="copyRight">
        Copyright © 2022 ProEats. All rights reserved.
      </div>
    </div>
  );
};
export default Homepage;
