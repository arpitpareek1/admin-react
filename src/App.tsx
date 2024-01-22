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


const App = () => {

  const navigate = useNavigate()

  useEffect(() => {
    console.log("useEffect");
    const token = localStorage.getItem("user")
    if (token === null && !window.location.pathname.includes("login")) {
      navigate("/")
    } else {
      if (window.location.pathname.includes("login")) {
        navigate("/admin")
      }
    }
  }, [navigate])

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
        <Route path="login" element={<SignIn />} />
        <Route path="SettingsEdit" element={<SettingsEdit />} />
        <Route path="*" element={<NotAvailable />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes >
    </>

  );
};

export default App;
