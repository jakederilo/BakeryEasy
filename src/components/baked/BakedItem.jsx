import React from "react";

const BakedItem = () => {
  return (
    <div className="bg-gray-200 group hover:bg-white mt-8 p-2 rounded-lg text-center">
      <img src="/blackforest.png" alt="pizza"></img>
      <h4 className="font-semibold text-xl my-3">Black Forest Premium</h4>
      <p className="test-gray-500 my-2 text-sm">
        Black Forest Premium is a rich and decadent cake that combines the
        classic flavors of chocolate sponge cake, cherries, and whipped cream.
      </p>
      <button className="bg-primary mt-4 text-white rounded-full px-8 py-2">
        Add to cart $12
      </button>
    </div>
  );
};

export default BakedItem;
