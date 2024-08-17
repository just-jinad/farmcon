import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Typewriter from "../../components/frontcomponent/Typewriter";
import { TranslationContext } from "../../components/frontcomponent/TranslationProvider";

const Signup = () => {
  const { switchLanguage, translations } = useContext(TranslationContext); // Access switchLanguage from context

  useEffect(() => {
    switchLanguage("en"); 
  }, []);
  // Set the default view to the registration form
  const [isSignIn, setIsSignIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const formikSignup = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      phone_number: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Input first name"),
      last_name: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Input last name"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email cannot be empty"),
      address: Yup.string()
        .max(500, "Must be 500 characters or less")
        .required("Address is required"),
      phone_number: Yup.string()
        .matches(
          /^[0-9]{10,15}$/,
          "Phone number must be between 10 and 15 digits."
        )
        .required("Phone number is required."),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/,
          "Password must contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character."
        )
        .required("Password cannot be empty."),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password cannot be empty."),
    }),
    onSubmit: (values, { resetForm }) => {
      axios
        .post("http://localhost:8888/register", values)
        .then((response) => {
          if (response.status === 200) {
            toast.success("User has been signed up successfully", {
              position: "top-center",
              autoClose: 5000,
              onClose: () => {
                setIsSignIn(true);
                resetForm();
              },
            });
          }
        })
        .catch((error) => {
          toast.error(
            error.response?.data?.message ||
              "There was an error registering the user!",
            {
              position: "top-center",
              autoClose: 5000,
            }
          );
        });
    },
  });

  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email cannot be empty"),
      password: Yup.string().required("Password cannot be empty."),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:8888/login", values)
        .then((response) => {
          const { token } = response.data;

          if (token) {
            localStorage.setItem("jwtToken", JSON.stringify(token));
            console.log(token);
            toast.success("Login successful", {
              position: "top-center",
              autoClose: 5000,
            });
            setTimeout(() => {
              navigate("/admin-dashboard/:category");
            }, 3000);
          }
        })
        .catch((err) => {
          toast.error(
            err.response?.data?.message || "Login failed. Please try again.",
            {
              position: "top-center",
              autoClose: 5000,
            }
          );
        });
    },
  });

  return (
    <div className="flex min-h-screen">
      <ToastContainer />
      {/* Left Section */}
      <div className="hidden md:flex w-1/2 bg-teal-700 text-white flex-col justify-center items-start p-12">
        <h1 className="text-4xl font-bold mb-4">{translations.signupWords || 'loading..'}</h1>
        <p className="mb-6">
          <Typewriter
            text={translations.typewriter || "loading..."}
            speed={30}
          />
        </p>
      </div>

      {/* Right Section */}
      <div className="flex w-full md:w-1/2 justify-center items-center p-12">
        <div className="w-full max-w-md">
          <div className="text-right mb-4">
            {isSignIn ? (
              <>
                <span className="text-gray-500 mr-2">
                  {translations.question1 || 'loading...'}
                </span>
                <button
                  onClick={() => setIsSignIn(false)}
                  className="bg-teal-700 text-white px-4 py-2 rounded"
                >
                  {translations.signupCall || "loading..."}
                </button>
              </>
            ) : (
              <>
                <span className="text-gray-500 mr-2">
                {translations.question2 || "loading..."}
                </span>
                <button
                  onClick={() => setIsSignIn(true)}
                  className="bg-teal-700 text-white px-4 py-2 rounded"
                >
                 {translations.login || "loading..."}
                </button>
              </>
            )}
          </div>
          <AnimatePresence mode="wait">
            {isSignIn ? (
              <motion.div
                key="signIn"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4">Sign In</h2>
                <form id="loginForm" onSubmit={formikLogin.handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">
                      {translations.email || 'loading'}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      onChange={formikLogin.handleChange}
                      onBlur={formikLogin.handleBlur}
                      value={formikLogin.values.email}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="you@example.com"
                    />
                    {formikLogin.touched.email && formikLogin.errors.email ? (
                      <div className="text-red-500 text-sm">
                        {formikLogin.errors.email}.
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">
                    {translations.password || 'loading'}

                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        onChange={formikLogin.handleChange}
                        onBlur={formikLogin.handleBlur}
                        value={formikLogin.values.password}
                        className="w-full px-4 py-2 pr-12 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("password")}
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-sm font-medium text-gray-600"
                      >
                        {showPassword ? (
                          <EyeIcon className="w-5 h-5" />
                        ) : (
                          <EyeSlashIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {formikLogin.touched.password &&
                    formikLogin.errors.password ? (
                      <div className="text-red-500  text-sm">
                        {formikLogin.errors.password}
                      </div>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-teal-700 text-white font-semibold px-4 py-2 rounded shadow hover:bg-teal-600 transition"
                  >
                    {translations.login || 'loading...'}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="signUp"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4">Registration</h2>
                <p className="mb-4">Create your free account</p>
                <form onSubmit={formikSignup.handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="first_name"
                        className="block text-gray-700"
                      >
                        First Name:
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        onChange={formikSignup.handleChange}
                        onBlur={formikSignup.handleBlur}
                        value={formikSignup.values.first_name}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Enter your first name"
                      />
                      {formikSignup.touched.first_name &&
                      formikSignup.errors.first_name ? (
                        <div className="text-red-600 text-sm">
                          {formikSignup.errors.first_name}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        htmlFor="last_name"
                        className="block text-gray-700"
                      >
                        Last Name:
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        onChange={formikSignup.handleChange}
                        onBlur={formikSignup.handleBlur}
                        value={formikSignup.values.last_name}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Enter your last name"
                      />
                      {formikSignup.touched.last_name &&
                      formikSignup.errors.last_name ? (
                        <div className="text-red-600 text-sm">
                          {formikSignup.errors.last_name}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">
                      Email address:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      onChange={formikSignup.handleChange}
                      onBlur={formikSignup.handleBlur}
                      value={formikSignup.values.email}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="you@example.com"
                    />
                    {formikSignup.touched.email && formikSignup.errors.email ? (
                      <div className="text-red-600 text-sm">
                        {formikSignup.errors.email}
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-700">
                      Address:
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      onChange={formikSignup.handleChange}
                      onBlur={formikSignup.handleBlur}
                      value={formikSignup.values.address}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    {formikSignup.touched.address &&
                    formikSignup.errors.address ? (
                      <div className="text-red-600 text-sm">
                        {formikSignup.errors.address}
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="phone_number"
                      className="block text-gray-700"
                    >
                      Phone number:
                    </label>
                    <input
                      type="tel"
                      id="phone_number"
                      name="phone_number"
                      onChange={formikSignup.handleChange}
                      onBlur={formikSignup.handleBlur}
                      value={formikSignup.values.phone_number}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="080XXX"
                    />
                    {formikSignup.touched.phone_number &&
                    formikSignup.errors.phone_number ? (
                      <div className="text-red-600 text-sm">
                        {formikSignup.errors.phone_number}
                      </div>
                    ) : null}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="mb-4">
                      <label htmlFor="password" className="block text-gray-700">
                        Password:
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          onChange={formikSignup.handleChange}
                          onBlur={formikSignup.handleBlur}
                          value={formikSignup.values.password}
                          className="w-full px-4 py-2 pr-12 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("password")}
                          className="absolute inset-y-0 right-0 flex items-center px-3 text-sm font-medium text-gray-600"
                        >
                          {showPassword ? (
                            <EyeIcon className="w-5 h-5" />
                          ) : (
                            <EyeSlashIcon className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {formikSignup.touched.password &&
                      formikSignup.errors.password ? (
                        <div className="text-red-600 text-sm">
                          {formikSignup.errors.password}
                        </div>
                      ) : null}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="confirmPassword"
                        className="block text-gray-700"
                      >
                        Confirm Password:
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          onChange={formikSignup.handleChange}
                          onBlur={formikSignup.handleBlur}
                          value={formikSignup.values.confirmPassword}
                          className="w-full px-4 py-2 pr-12 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
                          placeholder="Re-enter your password"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            togglePasswordVisibility("confirmPassword")
                          }
                          className="absolute inset-y-0 right-0 flex items-center px-3 text-sm font-medium text-gray-600"
                        >
                          {showPassword ? (
                            <EyeIcon className="w-5 h-5" />
                          ) : (
                            <EyeSlashIcon className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {formikSignup.touched.confirmPassword &&
                      formikSignup.errors.confirmPassword ? (
                        <div className="text-red-600 text-sm">
                          {formikSignup.errors.confirmPassword}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-teal-700 text-white font-semibold px-4 py-2 rounded shadow hover:bg-teal-600 transition"
                  >
                    Register
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Signup;
