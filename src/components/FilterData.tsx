"use client";
import { brand, categories, colors, products, sizes } from "@/data/dataAll";
import React, { useEffect, useState } from "react";

const FilterData = () => {
  const [allProduct, setAllProduct] = useState(products);

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);

  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);

  const pushCategory = (category: string) => {
    if (selectedCategory.includes(category)) {
      const filterCategory = selectedCategory.filter((el) => el !== category);
      setSelectedCategory(filterCategory);
    } else {
      setSelectedCategory([...selectedCategory, category]);
    }
  };
  console.log(selectedCategory);

  const pushBrand = (brand: string) => {
    if (selectedBrand.includes(brand)) {
      const filterCategory = selectedBrand.filter((el) => el !== brand);
      setSelectedBrand(filterCategory);
    } else {
      setSelectedBrand([...selectedBrand, brand]);
    }
  };
  console.log(selectedBrand);

  const pushSize = (size: string) => {
    if (selectedSize.includes(size)) {
      const filterSizes = selectedSize.filter((el) => el !== size);
      setSelectedSize(filterSizes);
    } else {
      setSelectedSize([...selectedSize, size]);
    }
  };
  console.log(selectedSize);

  const pushColor = (color: string) => {
    if (selectedColor.includes(color)) {
      const filterColors = selectedColor.filter((el) => el !== color);
      setSelectedColor(filterColors);
    } else {
      setSelectedColor([...selectedColor, color]);
    }
  };
  console.log(selectedColor);

  const categoryFilter = () => {
    let tempProducts;
    if (selectedCategory.length) {
      tempProducts = products.filter((product) =>
        selectedCategory.includes(product.category)
      );
      setAllProduct(tempProducts);
    }
    if (selectedBrand.length) {
      tempProducts = products.filter((product) =>
        selectedBrand.includes(product.brand)
      );
      setAllProduct(tempProducts);
    }
    if (selectedSize.length) {
      tempProducts = products.filter((product) =>
        selectedSize.includes(product.size)
      );
      setAllProduct(tempProducts);
    }
    if (selectedColor.length) {
      tempProducts = products.filter((product) =>
        selectedColor.includes(product.color)
      );
      setAllProduct(tempProducts);
    }
    if (
      selectedCategory.length &&
      selectedBrand.length &&
      selectedSize.length &&
      selectedColor.length
    ) {
      tempProducts = products.filter(
        (product) =>
          selectedCategory.includes(product.category) &&
          selectedBrand.includes(product.brand) &&
          selectedSize.includes(product.size) &&
          selectedColor.includes(product.color)
      );
      setAllProduct(tempProducts);
    } else {
      setAllProduct(products);
    }

    console.log("Problem...", tempProducts);
  };

  useEffect(() => {
    categoryFilter();
  }, [selectedBrand, selectedCategory, selectedSize, selectedColor]);

  return (
    <>
      <div className="flex flex-col justify-center items-start">
        {/* For Categories buttons */}
        <div className="flex justify-center items-center">
          {categories.map((category: string, i) => (
            <button
              onClick={() => pushCategory(category)}
              className={`${
                selectedCategory.includes(category)
                  ? "bg-green-700"
                  : "bg-sky-700"
              }  text-white rounded-md p-4 m-2`}
              key={i}
            >
              {category}
            </button>
          ))}
        </div>

        {/* For Brands buttons */}
        <div className="flex justify-center items-center">
          {brand.map((brand: string, i) => (
            <button
              onClick={() => pushBrand(brand)}
              className={`${
                selectedBrand.includes(brand) ? "bg-green-700" : "bg-sky-700"
              }  text-white rounded-md p-4 m-2`}
              key={i}
            >
              {brand}
            </button>
          ))}
        </div>
        {/* For Sizes buttons */}
        <div className="flex justify-center items-center">
          {sizes.map((size: string, i) => (
            <button
              onClick={() => pushSize(size)}
              className={`${
                selectedSize.includes(size) ? "bg-green-700" : "bg-sky-700"
              }  text-white rounded-md p-4 m-2`}
              key={i}
            >
              {size}
            </button>
          ))}
        </div>
        {/* For Colors buttons */}
        <div className="flex justify-center items-center">
          {colors.map((color: string, i) => (
            <button
              onClick={() => pushColor(color)}
              className={`${
                selectedColor.includes(color) ? "bg-green-700" : "bg-sky-700"
              }  text-white rounded-md p-4 m-2`}
              key={i}
            >
              {color}
            </button>
          ))}
        </div>
        <div className="">selectedCategory Array------------</div>
        {selectedCategory.map((cat, i) => (
          <span>{cat}--</span>
        ))}
        <div className="">selectedBrand Array------------</div>
        {selectedBrand.map((brand, i) => (
          <span>{brand}--</span>
        ))}
        <div className="">------------</div>
        {allProduct.map((product, i) => (
          <div className=" p-4 bg-slate-400 m-2">
            <span>{product.name}--</span>
            <span>{product.category}--</span>
            <span>{product.brand}--</span>
            <span>{product.color}--</span>
            <span>{product.size}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default FilterData;
