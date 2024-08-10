import React from "react";
import {  TextInput,  } from "flowbite-react";
import { MdPassword } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../../assets/images/farmcon logo1.jpg";
import Typewriter from "../../components/frontcomponent/Typewriter";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
          "Email must contain @ and .com"
        )
        .required("Email cannot be empty")
        .min(8, "Email must have at least 8 characters."),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$/,
          "Password must contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character."
        )
        .min(8, "Password must have at least 8 characters.")
        .required("Password cannot be empty."),
    }),
    onSubmit: (values) => {
      console.log(values);
      axios.post('http://localhost:8888/login', {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        console.log(response.data);
        const { token } = response.data;
        if (token) {
          localStorage.setItem('jwtToken', JSON.stringify(token)); 
          console.log('Token stored:', token);

          toast("Login successful 😊", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate('/admin-dashboard/:category');
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error(err.response.data, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
    },
  });
  return (
    <div className="">
       <main>
        <section className="absolute w-full h-full">
          <div
            className="absolute top-0 w-full h-full "
            style={{
              // backgroundImage:
              //   "url(https://i.pinimg.com/236x/76/49/fa/7649fa40e4277dfa0896dc9782b6f1c4.jpg)",
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat"
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg  border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-600 text-sm font-bold">
                        Sign in with
                      </h6>
                    </div>
                    <div className="btn-wrapper text-center">
                      <button
                        className="bg-white active:bg-gray-100 text-green-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        <img
                          alt="..."
                          className="w-5 mr-1"
                          // src={require("assets/img/github.svg").default}
                        />
                        Github
                      </button>
                      <button
                        className="bg-white active:bg-gray-100 text-green-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        <img
                          alt="..."
                          className="w-5 mr-1"
                          // src={require("assets/img/google.svg").default}
                        />
                        Google
                      </button>
                    </div>
                    <hr className="mt-6 border-b-1 border-gray-400" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-gray-500 text-center mb-3 font-bold">
                      <small>Or sign in with credentials</small>
                    </div>
                    <form>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Email"
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Password"
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>
                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                            style={{ transition: "all .15s ease" }}
                          />
                          <span className="ml-2 text-sm font-semibold text-gray-700">
                            Remember me
                          </span>
                        </label>
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-green-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex flex-wrap mt-6">
                  <div className="w-1/2">
                    <a
                      href="#pablo"
                      // onClick={e => e.preventDefault()}
                      className="text-black"
                    >
                      <small>Forgot password?</small>
                    </a>
                  </div>
                  <div className="w-1/2 text-right">
                    <a
                      href="#pablo"
                      // onClick={e => e.preventDefault()}
                      className="text-black"
                    >
                      <small>Create new account</small>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
export default Login;
