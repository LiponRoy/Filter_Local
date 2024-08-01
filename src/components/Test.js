"use client";
import { products } from "@/data/dataAll";
import React, { useState } from "react";

const Test = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategory ? product.category === selectedCategory : true) &&
      (selectedBrand ? product.brand === selectedBrand : true) &&
      (selectedColor ? product.color === selectedColor : true) &&
      (minPrice ? product.price >= minPrice : true) &&
      (maxPrice ? product.price <= maxPrice : true)
    );
  });

  const resetFilter = () => {
    setSelectedCategory("");
    setSelectedBrand("");
    setSelectedColor("");
  };

  return (
    <>
      <div class=" container m-auto flex flex-col sm:flex-row">
        <div className="w-full sm:w-[30%] bg-slate-100">
          <h1>Product Filters</h1>

          <div>
            <label>Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All</option>
              <option value="Gaming">Gaming</option>
              <option value="Ultrabook">Ultrabook</option>
              <option value="Business">Business</option>
              {/* Add more categories as needed */}
            </select>
          </div>

          <div>
            <label>Brand:</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">All</option>
              <option value="Dell">Dell</option>
              <option value="HP">HP</option>
              <option value="Apple">Apple</option>
              {/* Add more brands as needed */}
            </select>
          </div>

          <div>
            <label>Color:</label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              <option value="">All</option>
              <option value="Red">Red</option>
              <option value="Black">Black</option>
              <option value="Silver">Silver</option>
              {/* Add more colors as needed */}
            </select>
          </div>

          <div>
            <label>Min Price:</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>

          <div>
            <label>Max Price:</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <div className="">
            <button
              onClick={resetFilter}
              className=" bg-sky-700 rounded-md p-2 m-2 text-white"
            >
              CLEAR FILTER
            </button>
          </div>
        </div>
        {/* __________________  End filter section*/}

        <div className="w-full sm:w-[70%] bg-slate-100">
          <h2>Filtered Products</h2>
          <ul>
            <div className=" grid grid-cols-4">
              {filteredProducts.map((product) => (
                <li key={product.id}>
                  {product.category} - {product.category} - {product.brand} -{" "}
                  {product.color} - ${product.price}
                </li>
              ))}
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Test;
