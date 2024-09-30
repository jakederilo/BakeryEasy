import React from "react";
import BakedItem from "../baked/bakedItem";

const HomeMenu = () => {
  return (
    <section className="">
      <div className="grid grid-cols-3 gap-4">
        <BakedItem />
        <BakedItem />
        <BakedItem />
        <BakedItem />
        <BakedItem />
        <BakedItem />
      </div>
    </section>
  );
};

export default HomeMenu;
