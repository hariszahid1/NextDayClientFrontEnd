import React from "react";
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box,
  Center,
} from "@chakra-ui/react";
import "./plan-select.css";
import Step1 from "../images/Step1.png";
import Step2 from "../images/Step2.png";
import Step3 from "../images/Step3.png";
import Step4 from "../images/Step4.png";
import IStep2 from "../images/IStep2.png";
import IStep3 from "../images/IStep3.png";
import IStep4 from "../images/IStep4.png";
import Stage1 from "./stage1";
import Stage2 from "./stage2";
import Stage3 from "./stage3";
import Stage4 from "./stage4";
const SelectPlan = () => {
  const steps = [
    { title: "Start", description: "Contact Info", activeIcon: Step1,component: Stage1 },
    { title: "Customize", description: "Date & Time", activeIcon: Step2 , inActive:IStep2,component: Stage2  },
    { title: "Summary", description: "Select Rooms", activeIcon: Step3, inActive:IStep3,component: Stage3  },
    { title: "Checkout", description: "Select Rooms", activeIcon: Step4, inActive:IStep4,component:Stage4 },
  ];
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  const CurrentStepComponent = steps[activeStep].component;
  return (
    <div class="flex flex-col">
      <div className="grid justify-center mt-6">
        <Stepper size="lg" index={activeStep}>
          {steps.map((step, index) => (
            <Step key={index} onClick={() => setActiveStep(index)}>
              <div flexDirection="column">
                {/* <StepIndicator> */}
                <StepStatus
                  complete={
                    <img
                      src={step.activeIcon}
                      alt="Custom Icon"
                     
                    />
                  }
                  incomplete={<img src={step.inActive} />}
                  active={ activeStep === index ? <img src={step.activeIcon} />: <></>}
                />

                {/* </StepIndicator> */}

                <Box flexShrink="0" flexDirection="column" textAlign="center">
                  {
                    activeStep === index ? 
                    <StepTitle className="activeStepTitle">{step.title}</StepTitle>
                    :
                    <StepTitle className="InActiveStepTitle">{step.title}</StepTitle>
                  }
                </Box>
              </div>
              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </div>
      <CurrentStepComponent />
    </div>
  );
};

export default SelectPlan;
