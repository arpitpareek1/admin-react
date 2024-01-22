// ProductEditPage.tsx

import axios from 'axios';
import Navbar from 'components/navbar';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { News } from 'types/interfaces';
import { backend_url, toastCss } from 'variables/helper';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MiniCalendar from 'components/calendar/MiniCalendar';

const NewsEditPage: React.FC = () => {
    const [product, setProduct] = useState<null | News>(null);
    const location = useLocation();
    const navigate = useNavigate()
    const userData = location.state as News;

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
        if (!product.imageSource || !product.category || !product.title || !product.description || !product.date || !product.title) {
            alert('Please fill in all required fields.');
            return;
        }
        if (error !== null) {
            toast.info(error, toastCss);
        }

        axios
            .post(backend_url + 'user/updateNews', { ...product, productId: product._id })
            .then(({ data }) => {
                console.log(data);
                toast.info("News Updated", toastCss);
                navigate("/admin")
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {

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
                                    <span className="text-gray-700">Category:</span>
                                    <input
                                        type="text"
                                        name="category"
                                        value={product.category}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-gray-700">Date:</span>
                                    <MiniCalendar onValueChange={(text: any, event: any, callback: any) => {
                                        callback()
                                        handleInputChange({
                                            target: {
                                                name: "date",
                                                value: new Date(text).toDateString()
                                            }
                                        } as any)
                                    }} />
                                    <input
                                        type="text"
                                        name="date"
                                        value={product.date}
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
                                    <span className="text-gray-700">Description:</span>
                                    <input
                                        type="text"
                                        name="description"
                                        value={product.description}
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

export default NewsEditPage;
