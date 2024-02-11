import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import SignIn from "views/auth/SignIn";
import React, { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "views/admin/default";
import ProfileOverview from "views/admin/profile";
import ProductEditPage from "views/admin/default/components/EditProduct";
import NewsEditPage from "views/admin/default/components/editNews";
import SettingsEdit from "views/admin/default/components/SettingsEdit";
import UserEditPage from "views/admin/default/components/userEditPage";


const App = () => {

  const navigate = useNavigate()

  useEffect(() => {
    // Check if the user is not on the "welcome" or "login" page
    if (!window.location.pathname.includes("welcome") && !window.location.pathname.includes("login")) {
      const token = localStorage.getItem("user");

      // If the user has no token, redirect to the login page
      if (!token) {
        navigate("/login");
      } else {
        // If the user has a token, redirect to the admin page
        navigate("/admin");
      }
    } else {
      // If the user is on the "login" page, redirect to the admin page if a token is present
      if (window.location.pathname.includes("login")) {
        const token = localStorage.getItem("user");
        if (token) {
          navigate("/admin");
        }
      }
    }
  }, []);



  const NotAvailable = () => (
    <div className="text-center mt-10">
      <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
      <p className="mb-4 text-lg text-gray-600">Oops! Looks like you're lost.</p>
      <div className="animate-bounce">
        <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
        </svg>
      </div>
      <p className="mt-4 text-gray-600">Let's get you back <a href="/" className="text-blue-500">home</a>.</p>
    </div>
  )

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="admin" element={<Dashboard />} />
        <Route path="ProfileOverview" element={<ProfileOverview />} />
        <Route path="NewsEditPage" element={<NewsEditPage />} />
        <Route path="EditProduct" element={<ProductEditPage />} />
        <Route path="UserEditPage" element={<UserEditPage />} />
        <Route path="login" element={<SignIn />} />
        <Route path="SettingsEdit" element={<SettingsEdit />} />
        <Route path="*" element={<NotAvailable />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes >
    </>

  );
};

export default App;
