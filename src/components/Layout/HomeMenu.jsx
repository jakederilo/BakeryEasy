import React from "react";
import BakedItem from "../baked/bakedItem";

const HomeMenu = () => {
  return (
    <section className="">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-3 gap-4">
          <BakedItem />
          <BakedItem />
          <BakedItem />
          <BakedItem />
          <BakedItem />
          <BakedItem />
        </div>
      </div>
    </section>
  );
};

export default HomeMenu;
