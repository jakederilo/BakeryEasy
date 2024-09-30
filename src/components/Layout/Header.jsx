"use client";

import RegistrationForm from "../Login/RegisterForm";

import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-transparent sans-serif">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-0"
      >
        <div className="flex text-3xl items-center text-primary font-Roboto font-semibold lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            BAKERY EASY
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden font-Roboto lg:flex lg:gap-x-12">
          <Link
            to="/Hero"
            className=" text-m text-black font-semibold fontFamily-Valera-0 leading-6"
          >
            Home
          </Link>
          <Link
            to="/Menu"
            className="text-m text-black font-semibold fontFamily-Valera-0 leading-6"
          >
            Menu
          </Link>
          <Link
            to="/About"
            className="text-m text-black font-semibold fontFamily-Valera-0 leading-6"
          >
            About
          </Link>
          <Link
            to="/Contact"
            className="text-m text-black font-semibold fontFamily-Valera-0 leading-6"
          >
            Contact
          </Link>
        </PopoverGroup>
        <button className="hidden  rounded-full py-2 px-8 -mr-5 ml-24 lg:flex lg:justify-end ">
          <Link
            to="/LoginForm "
            className="text-lg font-extrabold leading-6 justify-center rounded-full py-2 text-fontFamily-Valera-0 text-black"
          >
            Login
          </Link>
        </button>
        <button id="" className="hidden lg:flex ml-0 lg:justify-end  ">
          <Link
            to="/RegisterForm"
            className="bg-primary flex gap-2 text-white font-extrabold px-8 py-2 rounded-full"
          >
            Register
          </Link>
        </button>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className=" fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              BAKERY PLAZA
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <Link
                to="/Hero"
                className="-mx-3 pt-4 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Home
              </Link>
              <Link
                href="Honemenu"
                className="-mx-3 pt-4 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Menu
              </Link>
              <Link
                href="About"
                className="-mx-3 pt-4 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                About
              </Link>
              <Link
                href="Contact"
                className="-mx-3 pt-4 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Contact
              </Link>
            </div>
            <div className="py-6">
              <Link
                to="LoginForm"
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7  bg-gray-100 text-gray-900 group hover:bg-gray-500"
              >
                Log in
              </Link>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
