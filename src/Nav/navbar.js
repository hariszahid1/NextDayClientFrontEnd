import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import NextDay from '../images/NextDay.jpg';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom';
import "./navbar.css"
const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-black">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
      <div className="flex lg:flex-1 navLogo">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only"></span>
            <img className="h-6 w-auto" src={NextDay} alt="Next Day" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="flex lg:flex-1 lg:hidden md:hidden mobileNavLogo">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only"></span>
            <img className="h-6 w-auto" src={NextDay} alt="Next Day" />
          </a>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Link  to="/" className="text-sm font-semibold leading-6 text-white menuClick" >
            Home
          </Link>
          <Link to="/selectPlan" className="text-sm font-semibold leading-6 text-white menuClick">
            Weekly Menu
          </Link>
          <Link to="/selectPlan" className="text-sm font-semibold leading-6 text-white menuClick">
            Your Plan
          </Link>
          <Link href="#" className="text-sm font-semibold leading-6 text-white menuClick">
            FAQ
          </Link>
          <div className='handleRegister'>
          <Link to="/signin" className="text-sm font-semibold leading-6 text-white menuClick">
            Log In
          </Link>
          
          <Link to="/signup" className="text-sm font-semibold leading-6 text-white menuClick">Register</Link>
          </div>

        </Popover.Group>
        <Popover.Group className="sm:flex lg:hidden">
          <div className='handleRegister'>
          <Link to="/signin" className="text-sm font-semibold leading-6 text-white menuClick" style={{color: '#D83241'}}>
            Log In
          </Link>
          
          <Link to="/signup" className="text-sm font-semibold leading-6 text-white menuClick">Register</Link>
          </div>

        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {/* <a href="#" className="text-sm font-semibold leading-6 text-white">
            Log in <span aria-hidden="true">&rarr;</span>
          </a> */}
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"  style={{ backgroundColor: 'black' }}>
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src={NextDay}
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" style={{color: 'white'}} />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {/* <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Product
                        <ChevronDownIcon
                          className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure> */}
                <Link
                  to="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white  hover:bg-gray-50"   onClick={() => setMobileMenuOpen(false)}

                >
                  Home
                </Link>
                <hr className='menuDivider' />
                <Link
                  to="/selectPlan"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-50"    onClick={() => setMobileMenuOpen(false)}
                >
                  Weekly Menu
                </Link>
                <hr className='menuDivider' />
                <Link
                  to="/selectPlan"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white  hover:bg-gray-50"     onClick={() => setMobileMenuOpen(false)}
                >
                  Your Plan
                </Link>
                <hr className='menuDivider'/>

                <Link
                  to="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white  hover:bg-gray-50"
                >
                  FAQ
                </Link>
              </div>
              <div className="py-6 signUpMobile">
                <Link
                  to="/signin"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 loginButtonMobile"  onClick={() => setMobileMenuOpen(false)}

                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white  hover:bg-gray-50"               onClick={() => setMobileMenuOpen(false)}

                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
