import React from 'react';
import checkCircle from '../images/check-circle.jpg'
const Success = ()=>{
    return(
        <div className='Success'>
            <img className= 'SuccessCheck' src={checkCircle} />
            <div className='congratulation'>Congratulations!</div>
            <div className='orderText'>Your Order is done</div>
            <div className='successDesc'>Thank you so much for Subscription! You can copy the bank info to make the transfer and we will send it to your email and whatsapp.</div>
            <div
                className="grid grid-col"
                style={{ position: "relative", top: "5rem" }}
              >
                <div className="grid grid-cols-3">
                  <div className="col-span-1 summaryText">Monthly Total</div>
                  <div className="col-span-1"></div>{" "}
                  {/* Empty column for spacing */}
                  <div className="col-span-1 summaryMonthly">1100 SAR</div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="col-span-1 summaryText ">
                    Additional fees:
                  </div>
                  <div className="col-span-1"></div>{" "}
                  {/* Empty column for spacing */}
                  <div className="col-span-1 summaryMonthly">20 SAR</div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="col-span-1 summaryText">Delivery</div>
                  <div className="col-span-1"></div>{" "}
                  {/* Empty column for spacing */}
                  <div className="col-span-1 summaryMonthly">Free</div>
                </div>
                <div className="lineSize">
                  <svg
                    width="326"
                    height="2"
                    viewBox="0 0 326 2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 1H326" stroke="#E4E4E4" stroke-opacity="0.6" />
                  </svg>
                </div>
                <br />
                <div className="grid grid-cols-3">
                  <div className="col-span-1 monthlyTotal">Total: </div>
                  <div className="col-span-1"></div>{" "}
                  {/* Empty column for spacing */}
                  <div
                    className="col-span-1 priceTotal"
                    style={{ right: "2rem", position: "relative" }}
                  >
                    1120 SAR
                  </div>
                </div>
              </div>
        </div>
    )
}

export default Success;