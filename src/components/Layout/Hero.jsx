import React from "react";
import CakeImage from "/cake.png";
import Right from "../icons/Right";
import { Link } from "react-router-dom";
import SectionHeaders from "./SectionHeaders";
import Custom from "../icons/Customize";
import Menu from "./Cake";
import About from "../Navbar/About";

const Hero = () => {
  return (
    <>
      <section className="hero ">
        <div className="py-12 ">
          <div>
            <h1 className="font-Roboto font-bold text-4xl">
              Life’s sweeter
              <br /> with a slice of
              <br /> <span className="text-primary">Cake</span>
            </h1>
            <p className="my-4 text-gray-500">
              Cake is the sweet touch that <br />
              turns ordinary moments into delightful memories.
            </p>
            <div className="font-Roboto flex gap-4 text-sm">
              <Link
                to="/customise"
                className="bg-white uppercase flex items-center gap-2 text-primary px-3 py-2 rounded-full"
              >
                Customize
                <Custom />
              </Link>
              <Link
                to="/cake"
                className="bg-primary uppercase flex items-center  text-white px-3 py-2 rounded-full"
              >
                Order now
                <Right />
              </Link>
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

      <Menu />
      <div className="py-16 px-8">
        <About />
      </div>
    </>
  );
};

export default Hero;
