import React from 'react';
import "./plan-select.css";
import menuPlan1 from "../images/menuPlan1.png";
import menuPlan2 from "../images/menuPlan2.png";
const Stage1 = ()=>{
    return (
        <div>
        <div class="flex font-sf-ui-text text-2xl font-semibold justify-center items-center mt-10">
        Select Your Plan
      </div>
      <div className="grid lg:grid-cols-2 lg:ml-20 mt-20">
        <div className="mealBox flex flex-row">
          <div>
              <img src={menuPlan1} className="menuPlan"/>
          </div>
          <div className="flex flex-col ">
              <div class="flex font-sf-ui-text text-2xl font-semibold ml-10 mt-6 heading1">Chicken & Beef</div>
              <div class="flex font-sf-ui-text  ml-10 mt-2 heading2">Weekly meals</div>
              <button className="mealPlanButton ml-10">Get Started</button>
          </div>
          <div>

          </div>
        </div>
        <div className="mealBox flex flex-row">
        <div>
              <img src={menuPlan2} className="menuPlan"/>
          </div>
          <div className="flex flex-col ">
              <div class="flex font-sf-ui-text text-2xl font-semibold ml-10 mt-6 heading1">Full Program</div>
              <div class="flex font-sf-ui-text  ml-10 mt-2 heading2">Based on your BMI</div>
              <button className="mealPlanButton ml-10">Get Started</button>
          </div>
          <div>

          </div>
        </div>
      </div>
        </div>
    )
}
export default Stage1;