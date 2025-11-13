import React from "react";
import "./plan-select.css";
import Edit from "../images/Edit.png";
import Delete from "../images/Delete.png";
import { InfoIcon } from "@chakra-ui/icons";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Input } from "@chakra-ui/react";
import GoogleMaps from "../components/googleMaps/googleMaps";
import Success from "./success";
const people = [
  {
    id: 1,
    name: "Wade Cooper",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    name: "Arlene Mccoy",
    avatar:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 3,
    name: "Devon Webb",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  },
  {
    id: 4,
    name: "Tom Cook",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 5,
    name: "Tanya Fox",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 6,
    name: "Hellen Schmidt",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 7,
    name: "Caroline Schultz",
    avatar:
      "https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 8,
    name: "Mason Heaney",
    avatar:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 9,
    name: "Claudie Smitham",
    avatar:
      "https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 10,
    name: "Emil Schaefer",
    avatar:
      "https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Stage4 = () => {
  const [gramSelected, setgramSelected] = useState(people[3]);
  const [mealSelected, setmealSelected] = useState(people[3]);
  const [confirmCheckBox, setConfirmCheckbox] = useState(false);

  return (
    <div className="stage4MainContainer">
      {confirmCheckBox ? (
        <Success> </Success>
      ) : (
        <>
          <div class="flex font-sf-ui-text text-2xl planSummary justify-center items-center mt-10">
            Checkout
          </div>
          <div className="formSizeStage4 grid grid-col">
            <div className="shippingAddressText">Shipping Address</div>
            <br />
            <div className="stage4Dropdown">
              <Listbox value={mealSelected} onChange={setmealSelected}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="block text-sm font-sf-ui-text text-2xl">
                      Deliver To
                    </Listbox.Label>
                    <div className="relative mt-2">
                      <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                        <span className="flex items-center">
                          <img
                            src={mealSelected.avatar}
                            alt=""
                            className="h-5 w-5 flex-shrink-0 rounded-full"
                          />
                          <span className="ml-3 block truncate">
                            {mealSelected.name}
                          </span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {people.map((person) => (
                            <Listbox.Option
                              key={person.id}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "bg-indigo-600 text-white"
                                    : "text-gray-900",
                                  "relative cursor-default select-none py-2 pl-3 pr-9"
                                )
                              }
                              value={person}
                            >
                              {({ mealSelected, active }) => (
                                <>
                                  <div className="flex items-center">
                                    <img
                                      src={person.avatar}
                                      alt=""
                                      className="h-5 w-5 flex-shrink-0 rounded-full"
                                    />
                                    <span
                                      className={classNames(
                                        mealSelected
                                          ? "font-semibold"
                                          : "font-normal",
                                        "ml-3 block truncate"
                                      )}
                                    >
                                      {person.name}
                                    </span>
                                  </div>

                                  {mealSelected ? (
                                    <span
                                      className={classNames(
                                        active
                                          ? "text-white"
                                          : "text-indigo-600",
                                        "absolute inset-y-0 right-0 flex items-center pr-4"
                                      )}
                                    >
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
            <div className="fullNameLabel">
              Full Name <span style={{ color: "red" }}>* </span>
            </div>
            <div className="inputFieldSize">
              <Input placeholder="Enter Full Name" size="md" />
            </div>
            <div className="addressLabel">
              Please Add your address <span style={{ color: "red" }}>* </span>
            </div>
            <div className="inputFieldSize">
              <Input placeholder="Deliver to" size="md" />
            </div>
            <div className="mapStage4">
              <GoogleMaps />
            </div>

            <div className="checkoutPayment">
              <div className="paymentOption1">Payment Option</div>
              <div className="bankTransfer">
                <div className="bankTransferDetail">
                  <div style={{ display: "flex", direction: "row" }}>
                    <div class="flex items-center mb-4">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>{" "}
                    <div className="bankTransferHeading">Bank Transfer</div>
                  </div>
                  <div className="bankDesc">
                    We will email you the bank info to make the transfer
                  </div>
                </div>
              </div>
              <div className="paymentOption2">Delivery Option</div>
              <div className="deliveryOption" style={{ bottom: "2rem" }}>
                <div className="deliveryDetail">
                  <div style={{ display: "flex", direction: "row" }}>
                    <div class="flex items-center mb-4">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>{" "}
                    <div className="bankTransferHeading">Standard Delivery</div>
                  </div>
                  <div className="bankDesc">(2 days meal)</div>
                </div>
              </div>
              <div
                className="grid grid-col"
                style={{ position: "relative", top: "5rem",right: "1rem" }}
              >
                <div className="grid grid-cols-3">
                  <div className="col-span-1 summaryText">Monthly Total</div>
                  <div className="col-span-1"></div>{" "}
                  {/* Empty column for spacing */}
                  <div className="col-span-1 summaryMonthly">1100 SAR</div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="col-span-1 summaryText ">
                    Additional fees: <InfoIcon />
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
                    style={{ right: "3rem", position: "relative",bottom:"0.5rem" }}
                  >
                    1120 SAR
                  </div>
                </div>
              </div>
              <div className="checkoutNote">
                The Last day for payment is 20/05/2022
              </div>
              <div className="checkoutButtonsStage4">
                <button
                  className="stage3Button"
                  onClick={() => setConfirmCheckbox(true)}
                >
                  Confirm Checkout
                </button>
                <button className="stage3Back">Back</button>
              </div>
            </div>

            <br />
            <br />
          </div>
        </>
      )}
    </div>
  );
};

export default Stage4;
