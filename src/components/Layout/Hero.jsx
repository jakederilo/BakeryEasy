import React from "react";
import CakeImage from "/cake.png";
import Right from "../icons/Right";
import HomeMenu from "./HomeMenu";
import SectionHeaders from "./SectionHeaders";

const Hero = () => {
  return (
    <>
      <section className="hero">
        <div className="py-12">
          <div>
            <h1
              className="font-Roboto font-semibold
            text-4xl"
            >
              Everything
              <br /> is better with
              <br /> a&nbsp;
              <span className="text-primary">Cake</span>
            </h1>
            <p className=" my-4 text-gray-500">
              Pizza is the missing pieace that makes every day complete, a
              simple yet delicious joy in life
            </p>
            <div className="font-Roboto flex gap-4 text-sm">
              <button className="bg-primary uppercase flex items-center gap-2 text-white px-4 py-2 rounded-full">
                Order now
                <Right />
              </button>
              <button className="flex gap-2 py-2 text-gray-600 font-medium text-fontFamily-Roboto-0">
                Learn more
                <Right />
              </button>
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            src={CakeImage}
            layout={"fill"}
            object-fit={"contain"}
            alt={"cake"}
          />
        </div>
      </section>
      <SectionHeaders />
      <HomeMenu />
    </>
  );
};

export default Hero;
