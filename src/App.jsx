import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/admin-dashboard/adminDashboard";
import Home from "./pages/admin-dashboard/Home";
import Login from "./pages/admin-dashboard/Login";
import Layout from "./components/frontcomponent/Layout";
import Signup from "./pages/admin-dashboard/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/frontcomponent/PrivateRoute";
import { LanguageProvider, useLanguage } from "./components/frontcomponent/LanguageContext";
import Test from "./pages/admin-dashboard/test";
import { TranslationProvider } from "./components/frontcomponent/TranslationProvider";
import Chat from "./pages/admin-dashboard/Chat";
import ChatDashboard from "./pages/admin-dashboard/ChatDashboard";



function App() {




  const handleNavigateToLogin = () => {
    // Logic to show the login form and scroll to it
    const formSection = document.getElementById("loginForm");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="h-[100vh] w-full">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
        <TranslationProvider>
      <Routes>
        <Route element={<Layout onLoginClick={handleNavigateToLogin} />}>
          <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        </Route>


        <Route path="/login" element={<Login />} />
        <Route path="/test" element={< Test/>} />
        <Route path="/chat" element={< Chat/>} />
        <Route path="/chat_dashboard" element={< ChatDashboard />} />

        
        <Route path="/admin-dashboard/:category" element={
          <PrivateRoute>
          <AdminDashboard />
          </PrivateRoute>
          } />
      </Routes>
           </TranslationProvider>
    </div>
  );
}

export default App;
