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
    <div className="flex items-center min-h-screen justify-center p-3">
      <div className="w-96 ">
        <div className="p-4 shadow-lg rounded-lg border-green-700">
          <span className="flex justify-center items-center mb-3">
            <Typewriter text="Login here" speed={250} />
          </span>
          <div
            className="p-5"
            style={{
              backgroundImage:
                "url(https://i.pinimg.com/564x/d7/80/1e/d7801ed2ff0420409ec4a9365260b1f0.jpg)",
              borderBottomLeftRadius: "50px",
            }}
          >
            <img src={logo} alt="" className="h-32 rounded  mx-auto" />
          </div>
          <form
            onSubmit={formik.handleSubmit}
            style={{
              border: "",
              borderTopLeftRadius: "30px",
            }}
          >
            <TextInput
              style={{ backgroundColor: "white" , color:'black'}}
              className="my-3"
              type="text"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              rightIcon={MdEmail}
              placeholder="name@flowbite.com"
              required
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="alert alert-danger">{formik.errors.email}</div>
            ) : null}

            <TextInput
              style={{ backgroundColor: "white" , color:'black' }}
              className="my-3"
              type="text"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              rightIcon={MdPassword}
              placeholder="password"
              required
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="alert alert-danger">{formik.errors.password}</div>
            ) : null}
            <button
              type="submit"
              className="
      btn btn-transparen
      p-3
       mt-4 w-full rounded-2xl
     text-white 
       fw-bold
      bg-green-800
      hover:bg-teal-950
      "
            >
              Login
            </button>
            <p className="text-center mt-3">
              Don't have an account?{" "}
              <Link className="underline" to={"/signup"}>
                Signup here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
