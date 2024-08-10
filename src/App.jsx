import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/admin-dashboard/adminDashboard";
import Home from "./pages/admin-dashboard/Home";
import Login from "./pages/admin-dashboard/Login";
import Layout from "./components/frontcomponent/Layout";
import Signup from "./pages/admin-dashboard/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <Routes>
        <Route element={<Layout onLoginClick={handleNavigateToLogin} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard/:category" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
