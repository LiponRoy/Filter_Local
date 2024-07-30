'use client';
import { brand, categories, products } from '@/data/dataAll';
import React, { useEffect, useState } from 'react';

const FilterData = () => {
    const [allProduct, setAllProduct] = useState(products);
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string[]>([]);

    const kk = []
    if (kk.length) {
        console.log("kk vora")
    } else {
        console.log("kk Khali")

    }

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

    const categoryFilter = () => {
        let tempProducts;
        if (selectedCategory.length) {
            tempProducts = products.filter((product) =>
                selectedCategory.includes(product.category)
            );
            setAllProduct(tempProducts);
        } else if (selectedBrand.length) {
            tempProducts = products.filter((product) =>
                selectedBrand.includes(product.brand)
            );
            setAllProduct(tempProducts);
        } else if (selectedCategory.length && selectedBrand.length) {
            tempProducts = products.filter(
                (product) =>
                    selectedBrand.includes(product.brand) &&
                    selectedCategory.includes(product.category)
            );
            setAllProduct(tempProducts);
        } else {
            setAllProduct(products);
        }
    };

    useEffect(() => {
        categoryFilter();
    }, [selectedBrand, selectedCategory]);

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center items-center">
                    {categories.map((category: string, i) => (
                        <button
                            onClick={() => pushCategory(category)}
                            className={`${selectedCategory.includes(category)
                                ? 'bg-green-700'
                                : 'bg-sky-700'
                                }  text-white rounded-md p-4 m-2`}
                            key={i}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* ... */}

                <div className="flex justify-center items-center">
                    {brand.map((brand: string, i) => (
                        <button
                            onClick={() => pushBrand(brand)}
                            className={`${selectedBrand.includes(brand) ? 'bg-green-700' : 'bg-sky-700'
                                }  text-white rounded-md p-4 m-2`}
                            key={i}
                        >
                            {brand}
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
                        <span>{product.brand}</span>
                    </div>
                ))}
            </div>
        </>
    );
};

export default FilterData;
