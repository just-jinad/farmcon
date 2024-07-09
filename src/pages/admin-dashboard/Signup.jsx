import React from "react";
import { TextInput } from "flowbite-react";
import {
  MdOutlineDriveFileRenameOutline,
  MdPassword,
  MdEmail,
} from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import logo from "../../assets/images/farmcon logo1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  let url = "http://localhost:8888/register"
  const navigate = useNavigate();
  const formik = useFormik({
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
        .matches(
          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
          "Email must contain @ and .com"
        )
        .required("Email cannot be empty")
        .min(8, "Password must have at least 8 characters."),
      address: Yup.string()
        .max(500, "Must be 500 characters or less")
        .required("Required"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$/,
          "Password must contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character."
        )
        .min(8, "Password must have at least 8 characters.")
        .required("Password cannot be empty."),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Password cannot be empty."),
    }),
    onSubmit: (values) => {
      axios
        .post(url, {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          phone_number: values.phone_number,
          address: values.address,
          password: values.password,
        })
        .then((response) => {
          console.log("User registered:", response);
          if (response.status == 200) {
            toast("User has been signed successfully 😊", {
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
              navigate("/login");
            }, 4000);
          }
        })
        .catch((error) => {
          console.error("There was an error registering the user!", error);
          alert("Failed to register user");
        });
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen p-3 shadow-lg">
      <div className="max-w-md w-full">
        <div className="p-4 shadow-lg rounded-lg border-green-700">
          <div
            className="p-5"
            style={{
              backgroundImage:
                "url(https://i.pinimg.com/564x/d7/80/1e/d7801ed2ff0420409ec4a9365260b1f0.jpg)",
              borderBottomLeftRadius: "50px",
            }}
          >
            <img src={logo} alt="" className="h-32 rounded mx-auto" />
          </div>

          <form
            onSubmit={formik.handleSubmit}
            style={{ borderTopLeftRadius: "30px", marginTop: "5%" }}
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <TextInput
                  style={{ backgroundColor: "white", color: "black"}}
                  id="first_name"
                  name="first_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.first_name}
                  rightIcon={MdOutlineDriveFileRenameOutline}
                  placeholder="First Name"
                />
                {formik.touched.first_name && formik.errors.first_name ? (
                  <div className="text-red-400">{formik.errors.first_name}</div>
                ) : null}
              </div>
              <div>
                <TextInput
                  style={{ backgroundColor: "white", color: "black" }}
                  id="last_name"
                  name="last_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.last_name}
                  rightIcon={MdOutlineDriveFileRenameOutline}
                  placeholder="Last Name"
                />
                {formik.touched.last_name && formik.errors.last_name ? (
                  <div className="text-red-400">{formik.errors.last_name}</div>
                ) : null}
              </div>
              <div className="sm:col-span-2">
                <TextInput
                  style={{ backgroundColor: "white", color: "black" }}
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  rightIcon={MdEmail}
                  placeholder="name@flowbite.com"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-400">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="sm:col-span-2">
                <TextInput
                  style={{ backgroundColor: "white", color: "black" }}
                  id="phone_number"
                  name="phone_number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone_number}
                  rightIcon={MdEmail}
                  placeholder="+234"
                />
                {formik.touched.phone_number && formik.errors.phone_number ? (
                  <div className="text-red-400">
                    {formik.errors.phone_number}
                  </div>
                ) : null}
              </div>
              <div className="sm:col-span-2">
                <TextInput
                  style={{ backgroundColor: "white", color: "black" }}
                  id="address"
                  name="address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                  rightIcon={MdEmail}
                  placeholder="Address"
                />
                {formik.touched.address && formik.errors.address ? (
                  <div className="text-red-400">{formik.errors.address}</div>
                ) : null}
              </div>
              <div>
                <TextInput
                  style={{ backgroundColor: "white", color: "black" }}
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  rightIcon={MdPassword}
                  placeholder="Password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-400">{formik.errors.password}</div>
                ) : null}
              </div>
              <div>
                <TextInput
                  style={{ backgroundColor: "white", color: "black" }}
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  rightIcon={MdPassword}
                  placeholder="Confirm Password"
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="text-red-400">
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </div>
            </div>
            <button
              type="submit"
              className="p-3 rounded-3xl mt-4 w-full fw-bold text-white bg-green-500 hover:bg-green-600"
            >
              Sign up
            </button>
            <p className="text-center mt-3">
              Already have an account?{" "}
              <Link className="underline" to={"/login"}>
                login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
