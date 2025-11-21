import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import './register.css';
import SignInImg from '../images/SignIn.png';
import SignInImg1 from '../images/SignIn1.png';
import NextDay from '../images/Logo Nextday.png';
import GoogleMaps from '../components/googleMaps/googleMaps';
import NutritionCalculator from '../pages/NutritionCalculator/NutritionCalculator';
import Step1 from '../images/Step1.png';
import Step2 from '../images/Step2.png';
import Step3 from '../images/Step3.png';
import Step4 from '../images/Step4.png';
import IStep2 from '../images/IStep2.png';
import IStep3 from '../images/IStep3.png';
import IStep4 from '../images/IStep4.png';

const stepVariants = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export default function Register() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');

  const onConfirmLocation = (address) => setSelectedAddress(address || '');

  // Define progress steps - same as weekly menu
  const steps = [
    { title: "Start", description: "Contact Info", activeIcon: Step1 },
    { title: "Customize", description: "Date & Time", activeIcon: Step2, inActive: IStep2 },
    { title: "Summary", description: "Select Rooms", activeIcon: Step3, inActive: IStep3 },
    { title: "Checkout", description: "Select Rooms", activeIcon: Step4, inActive: IStep4 },
  ];

  // Calculate active step index based on current step
  const getActiveStepIndex = () => {
    if (step <= 3) return 0; // Steps 1, 2, 3 = "Start"
    if (step === 4) return 1; // Step 4 = "Customize" (calculator)
    return 0;
  };

  const activeStepIndex = getActiveStepIndex();

  return (
    <div className={"registerGrid" + (step === 4 ? ' fullLeft' : '')}>
      <div className="leftCol">
        {/* Progress Tracker - Outside Card - Same as Weekly Menu */}
        <div className="grid justify-center register-stepper-wrapper">
          <Stepper size="lg" index={activeStepIndex}>
            {steps.map((stepItem, index) => (
              <Step key={index}>
                <div flexDirection="column">
                  <StepStatus
                    complete={
                      <img
                        src={stepItem.activeIcon}
                        alt="Custom Icon"
                      />
                    }
                    incomplete={<img src={stepItem.inActive} />}
                    active={activeStepIndex === index ? <img src={stepItem.activeIcon} /> : <></>}
                  />

                  <Box flexShrink="0" flexDirection="column" textAlign="center">
                    {
                      activeStepIndex === index ?
                        <StepTitle className="activeStepTitle">{stepItem.title}</StepTitle>
                        :
                        <StepTitle className="InActiveStepTitle">{stepItem.title}</StepTitle>
                    }
                  </Box>
                </div>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </div>

        <div className={"cardWrap" + (step === 4 ? ' calculator-center' : '')}>
          <div className="cardHeader">
            <img src={NextDay} alt="NextDay" className="logoImg" />
            <h1 className="cardTitle">NextDay Food Kitchen</h1>
            <p className="cardSubtitle">{step === 3 ? 'We need your delivery location to see if we can deliver fresh meals to you.' : step === 4 ? 'Start your journey to better health with precise nutrition planning.' : 'Welcome! Sign up to continue enjoying your favorite meals.'}</p>
          </div>

          {/* Old progress tracker - shown for steps 1-3, hidden inside calculator (step 4) */}
          {step !== 4 && (
            <div className="stepsIndicator">
              <div className={`stepDot ${step>=1? 'active' : ''}`}>1</div>
              <div className={`stepLine ${step>1? 'active' : ''}`} />
              <div className={`stepDot ${step>=2? 'active' : ''}`}>2</div>
              <div className={`stepLine ${step>2? 'active' : ''}`} />
              <div className={`stepDot ${step>=3? 'active' : ''}`}>3</div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="s1"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.32 }}
                className="stepPane"
              >
                <label className="label">Phone Number</label>
                <input className="input" placeholder="Enter phone number" value={phone} onChange={e=>setPhone(e.target.value)} />
                <button
                  className={`primaryButton ${phone? '' : 'disabled'}`}
                  onClick={() => phone && setStep(2)}
                >
                  Send SMS Code
                </button>
                {/* <p className="subText">Don't have an account? <span className="linkText">Sign up</span></p> */}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="s2"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.32 }}
                className="stepPane"
              >
                <label className="label">Enter Code</label>
                <input className="input" placeholder="6-digit code" value={code} onChange={e=>setCode(e.target.value)} />
                <button
                  className={`primaryButton ${code.length>=6? '' : 'disabled'}`}
                  onClick={() => code.length>=6 && setStep(3)}
                >
                  Confirm
                </button>
                <p className="subText">Didn't receive the code? <button className="linkText" onClick={()=>alert('Resend (UI only)')}>Resend</button></p>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="s3"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.32 }}
                className="stepPane"
              >
                <h2 className="label">Set your delivery location</h2>
                <p className="desc">Drag the pin on the map on the right to mark your location.</p>
                <label className="label">Address</label>
                <input className="input" placeholder="Address will appear here after confirm" value={selectedAddress} readOnly />
                <button
                  className={`primaryButton ${selectedAddress? '' : 'disabled'}`}
                  onClick={() => selectedAddress ? setStep(4) : null}
                >
                  Continue
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          {step === 4 && (
            <div style={{ width: '100%', marginTop: '18px' }}>
              <NutritionCalculator />
            </div>
          )}
        </div>
      </div>

      <div className="rightCol" aria-label="Promotional visuals and map">
        {step !== 3 && (
          <div className="promoBlock anim-fade-up">
            <div className="phoneLogo">
              <img src={SignInImg} className="signInImg" alt="App preview phone 1" />
              <img src={SignInImg1} className="signInImg1" alt="App preview phone 2" />
            </div>
            <div className="nextDayPosition anim-scale-in">
              <img src={NextDay} className="NextDayLogo" alt="NextDay Logo" />
              <div className="mealNextDay">Meals at your fingertips</div>
              <div className="mealNextDayDesc">View menus, select meals and see your scheduled deliveries.</div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mapWrapperFull anim-fade-up">
            <GoogleMaps onConfirm={(address)=>{ onConfirmLocation(address); }} />
          </div>
        )}
      </div>
    </div>
  );
}
