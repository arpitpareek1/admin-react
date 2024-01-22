// ProductEditPage.tsx

import axios from 'axios';
import Navbar from 'components/navbar';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Products } from 'types/interfaces';
import { backend_url, toastCss } from 'variables/helper';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProductEditPage: React.FC = () => {
    const [product, setProduct] = useState<null | Products>(null);
    const location = useLocation();
    const navigate = useNavigate()
    const userData = location.state as Products;

    useEffect(() => {
        setProduct(userData);
    }, [userData]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSave = () => {
        const error: string | null = null
        if (!product.imageSource || !product.link || !product.title) {
            alert('Please fill in all required fields.');
            return;
        }

        if (isNaN(product.price) || isNaN(product.dailyIncome) || isNaN(product.validity) || isNaN(product.purchaseLimit)) {
            alert('Please enter valid numeric values for price, daily income, validity, and purchase limit.');
            return;
        }
        if (error !== null) {
            toast.info(error, toastCss);
        }

        axios
            .post(backend_url + 'user/updatedProduct', { ...product, productId: product._id })
            .then(({ data }) => {
                console.log(data);
                toast.info("Product Updated", toastCss);
                navigate("/admin")
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                // Handle cleanup
            });
    };

    return (
        <>
            {product && (
                <div className="flex h-screen bg-lightPrimary dark:bg-navy-900 overflow-auto">
                    <div className="w-full h-full">
                        <Navbar brandText="Edit Product" />
                        <div className="max-w-2xl mx-auto p-6">
                            <div className="grid grid-cols-1 gap-6">
                                <label className="block">
                                    <span className="text-gray-700">Image Source:</span>
                                    <input
                                        type="text"
                                        name="imageSource"
                                        value={product.imageSource}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                </label>
                                <label className="block">
                                    <span className="text-gray-700">Link:</span>
                                    <input
                                        type="text"
                                        name="link"
                                        value={product.link}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                </label>
                                <label className="block">
                                    <span className="text-gray-700">Price:</span>
                                    <input
                                        type="number"
                                        name="price"
                                        value={product.price}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                </label>
                                <label className="block">
                                    <span className="text-gray-700">Title:</span>
                                    <input
                                        type="text"
                                        name="title"
                                        value={product.title}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                </label>
                                <label className="block">
                                    <span className="text-gray-700">Daily Income:</span>
                                    <input
                                        type="number"
                                        name="dailyIncome"
                                        value={product.dailyIncome}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                </label>
                                <label className="block">
                                    <span className="text-gray-700">Validity:</span>
                                    <input
                                        type="number"
                                        name="validity"
                                        value={product.validity}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                </label>
                                <label className="block">
                                    <span className="text-gray-700">Purchase Limit:</span>
                                    <input
                                        type="number"
                                        name="purchaseLimit"
                                        value={product.purchaseLimit}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                </label>
                                <label className="block">
                                    <span className="text-gray-700">Description:</span>
                                    <textarea
                                        name="desc"
                                        value={product.desc}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                </label>
                                <div className="mt-4">
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductEditPage;
