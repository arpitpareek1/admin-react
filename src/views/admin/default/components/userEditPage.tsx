import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserInfo } from "types/interfaces";
import { backend_url, toastCss } from "variables/helper";

const UserEditPage = () => {
    // State to track changes to user data
    const navigate = useNavigate()
    const location = useLocation();
    const user = location.state as UserInfo;
    const [errors, setErrors] = useState<any>({});
    const [userData, setUserData] = useState(user);
    console.log(user);



    // Function to handle form submission
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formErrors = validateForm(userData);
        if (Object.keys(formErrors).length === 0) {
            console.log("Form submitted successfully:", userData);
            axios.post(backend_url + "auth/updateUser", userData).then(({ data }) => {
                console.log("data", data);
                if (data.message) {
                    toast.info(data.message, toastCss);
                    navigate("/admin")
                } else {
                    toast.error(data.error, toastCss);
                }
            }).catch((e) => {
                console.log(e);
                toast.error(e.message, toastCss);
            });
        } else {
            console.error("Form submission failed. Errors:", formErrors);
            setErrors(formErrors);
        }
    };

    // Function to validate form
    const validateForm = (data: UserInfo) => {
        let errors: any = {};

        if (!data.name) {
            errors.name = "Name is required";
        }
        if (!data.email) {
            errors.email = "Email is required";
        } else if (!isValidEmail(data.email)) {
            errors.email = "Invalid email address";
        } else if (!data.address || data.address.length < 6 || data.address.length > 30) {
            errors.address = "Address must be between 6 and 30 characters";
        }
        // Add more validation rules as needed

        return errors;
    };

    // Function to check if email is valid
    const isValidEmail = (email: string) => {
        // Simple email validation regex
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // Function to handle input changes
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setUserData((prevUserData: any) => ({
            ...prevUserData,
            [name]: value,
        }));
        // const errors: { [key: string]: string } = {};
        // Clear error message when user starts typing again
        if (errors[name]) {
            setErrors((prevErrors: any) => ({
                ...prevErrors,
                [name]: "",
            }));
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Edit User</h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    value={userData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm"
                                />
                            </div>
                        </div>
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm"
                                />
                            </div>
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone
                            </label>
                            <div className="mt-1">
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    minLength={10}
                                    maxLength={10}
                                    autoComplete="tel"
                                    value={userData.phone}
                                    onChange={handleInputChange}
                                    className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm"
                                />
                            </div>
                        </div>
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                Address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    minLength={6}
                                    maxLength={30}
                                    value={userData.address}
                                    onChange={handleInputChange}
                                    className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm"
                                />
                            </div>
                        </div>
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="text"
                                    autoComplete="password"
                                    minLength={6}
                                    value={userData.password}
                                    onChange={handleInputChange}
                                    className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm"
                                />
                            </div>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        <div>
                            <label htmlFor="money" className="block text-sm font-medium text-gray-700">
                                Balance
                            </label>
                            <div className="mt-1">
                                <input
                                    id="money"
                                    name="money"
                                    type="number"
                                    autoComplete="money"
                                    value={userData.money}
                                    onChange={handleInputChange}
                                    className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm"
                                />
                            </div>
                        </div>
                        {errors.money && <p className="text-red-500 text-sm mt-1">{errors.money}</p>}
                        <div>
                            <label htmlFor="rechargePoints" className="block text-sm font-medium text-gray-700">
                                Deposit Points
                            </label>
                            <div className="mt-1">
                                <input
                                    id="rechargePoints"
                                    name="rechargePoints"
                                    type="number"
                                    autoComplete="rechargePoints"
                                    value={userData.rechargePoints}
                                    onChange={handleInputChange}
                                    className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm"
                                />
                            </div>
                        </div>
                        {errors.rechargePoints && <p className="text-red-500 text-sm mt-1">{errors.rechargePoints}</p>}
                        <div className="flex items-center justify-end">
                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserEditPage;
