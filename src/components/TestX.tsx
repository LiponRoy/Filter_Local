"use client";
import { allCuisines, products } from "@/data/dataAll";
import React, { useState } from "react";



const allBrands = ["Dell", "HP", "Apple"];
const allColors = ["Red", "Black", "Silver"];

const Test = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  // Generic checkbox handler for multi-select filters
  const handleCheckboxChange = (
    value: string,
    selectedList: string[],
    setSelectedList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selectedList.includes(value)) {
      setSelectedList(selectedList.filter((item) => item !== value));
    } else {
      setSelectedList([...selectedList, value]);
    }
  };

  // Filtering and sorting products
  const filteredProducts = products
    .filter((product) => {
      // Filter by cuisines: show product if ANY cuisine matches any selected cuisine
      const cuisineMatch =
        selectedCuisines.length === 0
          ? true
          : product.cuisines.some((c) => selectedCuisines.includes(c));

      return (
        (selectedCategory ? product.category === selectedCategory : true) &&
        (selectedBrands.length > 0 ? selectedBrands.includes(product.brand) : true) &&
        (selectedColors.length > 0 ? selectedColors.includes(product.color) : true) &&
        cuisineMatch &&
        (minPrice ? product.price >= parseFloat(minPrice) : true) &&
        (maxPrice ? product.price <= parseFloat(maxPrice) : true)
      );
    })
    .slice()
    .sort((a, b) => {
      if (!selectedSort) return 0;

      if (selectedSort === "fastestDelivery") {
        return a.fastestDelivery - b.fastestDelivery;
      }
      if (selectedSort === "distance") {
        return a.distance - b.distance;
      }
      if (selectedSort === "topRated") {
        return b.topRated - a.topRated;
      }
      return 0;
    });

  const resetFilter = () => {
    setSelectedCategory("");
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedCuisines([]);
    setMinPrice("");
    setMaxPrice("");
    setSelectedSort("");
  };

  return (
    <div className="container mx-auto flex flex-col sm:flex-row gap-4">
      <div className="w-full sm:w-[30%] bg-slate-100 p-4 space-y-4">
        <h1 className="text-xl font-semibold">Product Filters</h1>

        {/* Category */}
        <div>
          <label className="block mb-2 font-medium">Category:</label>
          <div className="flex flex-col space-y-1">
            <label>
              <input
                type="radio"
                name="category"
                value=""
                checked={selectedCategory === ""}
                onChange={() => setSelectedCategory("")}
              />{" "}
              All
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="Gaming"
                checked={selectedCategory === "Gaming"}
                onChange={() => setSelectedCategory("Gaming")}
              />{" "}
              Gaming
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="Ultrabook"
                checked={selectedCategory === "Ultrabook"}
                onChange={() => setSelectedCategory("Ultrabook")}
              />{" "}
              Ultrabook
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="Business"
                checked={selectedCategory === "Business"}
                onChange={() => setSelectedCategory("Business")}
              />{" "}
              Business
            </label>
          </div>
        </div>

        {/* Brand */}
        <div>
          <label className="block">Brand:</label>
          {allBrands.map((brand) => (
            <div key={brand}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() =>
                    handleCheckboxChange(brand, selectedBrands, setSelectedBrands)
                  }
                />{" "}
                {brand}
              </label>
            </div>
          ))}
        </div>

        {/* Color */}
        <div>
          <label className="block">Color:</label>
          {allColors.map((color) => (
            <div key={color}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedColors.includes(color)}
                  onChange={() =>
                    handleCheckboxChange(color, selectedColors, setSelectedColors)
                  }
                />{" "}
                {color}
              </label>
            </div>
          ))}
        </div>

        {/* Cuisine */}
        <div>
          <label className="block font-medium">Cuisine:</label>
          {allCuisines.map((cuisine) => (
            <div key={cuisine}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedCuisines.includes(cuisine)}
                  onChange={() =>
                    handleCheckboxChange(cuisine, selectedCuisines, setSelectedCuisines)
                  }
                />{" "}
                {cuisine}
              </label>
            </div>
          ))}
        </div>

        {/* Min Price */}
        <div>
          <label>Min Price:</label>
          <input
            className="w-full border p-1"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min={0}
          />
        </div>

        {/* Max Price */}
        <div>
          <label>Max Price:</label>
          <input
            className="w-full border p-1"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            min={0}
          />
        </div>

        {/* Sort By */}
        <div>
          <label className="block mb-2 font-medium">Sort By:</label>
          <div className="flex flex-col space-y-1">
            <label>
              <input
                type="radio"
                name="sort"
                value=""
                checked={selectedSort === ""}
                onChange={() => setSelectedSort("")}
              />{" "}
              None
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                value="fastestDelivery"
                checked={selectedSort === "fastestDelivery"}
                onChange={() => setSelectedSort("fastestDelivery")}
              />{" "}
              Fastest Delivery
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                value="distance"
                checked={selectedSort === "distance"}
                onChange={() => setSelectedSort("distance")}
              />{" "}
              Distance
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                value="topRated"
                checked={selectedSort === "topRated"}
                onChange={() => setSelectedSort("topRated")}
              />{" "}
              Top Rated
            </label>
          </div>
        </div>

        {/* Clear filter button */}
        <div>
          <button
            onClick={resetFilter}
            className="bg-sky-700 rounded-md p-2 text-white w-full"
          >
            CLEAR FILTER
          </button>
        </div>
      </div>

      {/* Products display */}
      <div className="w-full sm:w-[70%] bg-slate-100 p-4">
        <h2 className="text-xl font-semibold mb-4">Filtered Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border p-4 rounded-md bg-white shadow"
              >
                <p>
                  <strong>Name:</strong> {product.name}
                </p>
                <p>
                  <strong>Category:</strong> {product.category}
                </p>
                <p>
                  <strong>Brand:</strong> {product.brand}
                </p>
                <p>
                  <strong>Color:</strong> {product.color}
                </p>
                <p>
                  <strong>Cuisines:</strong> {product.cuisines.join(", ")}
                </p>
                <p>
                  <strong>Price:</strong> ${product.price}
                </p>
                <p>
                  <strong>Fastest Delivery:</strong> {product.fastestDelivery} mins
                </p>
                <p>
                  <strong>Distance:</strong> {product.distance} km
                </p>
                <p>
                  <strong>Top Rated:</strong> {product.topRated} / 5
                </p>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Test;
