import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './register.css';
import SignInImg from '../images/SignIn.png';
import SignInImg1 from '../images/SignIn1.png';
import NextDay from '../images/Logo Nextday.png';
import GoogleMaps from '../components/googleMaps/googleMaps';
import NutritionCalculator from '../pages/NutritionCalculator/NutritionCalculator';

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

  return (
    <div className={"registerGrid" + (step === 4 ? ' fullLeft' : '')}>
      <div className="leftCol">
        <div className={"cardWrap" + (step === 4 ? ' calculator-center' : '')}>
          <div className="cardHeader">
            <img src={NextDay} alt="NextDay" className="logoImg" />
            <h1 className="cardTitle">NextDay Food Kitchen</h1>
            <p className="cardSubtitle">{step === 3 ? 'We need your delivery location to see if we can deliver fresh meals to you.' : step === 4 ? 'Start your journey to better health with precise nutrition planning.' : 'Welcome! Sign up to continue enjoying your favorite meals.'}</p>
          </div>

          <div className="stepsIndicator">
            <div className={`stepDot ${step>=1? 'active' : ''}`}>1</div>
            <div className={`stepLine ${step>1? 'active' : ''}`} />
            <div className={`stepDot ${step>=2? 'active' : ''}`}>2</div>
            <div className={`stepLine ${step>2? 'active' : ''}`} />
            <div className={`stepDot ${step>=3? 'active' : ''}`}>3</div>
          </div>

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
