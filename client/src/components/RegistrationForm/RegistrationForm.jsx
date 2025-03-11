import React from "react";
import "./RegistrationForm.css";
import { useState, useEffect } from "react";
import { useAuth, AuthProvider } from "../../auth.js";
import axios from "axios";
import { toast } from "react-toastify";
import LoginContext from "../../Context/LoginContext.js";
import Navbars from "../Navbar/Navbars.jsx";
import Footer from "../Footer/Footer.jsx";
import { Navigate, useNavigate } from "react-router-dom";
import DeliveryBoy from "../Employee/DeliveryBoy.jsx";
import { useContext } from "react";
import { checkSession } from "../api.js";
// import ProductContext from '../Context/ProductContext.js';

function RegistrationForm(props) {
  const userContext = useContext(LoginContext);
  const navigate = useNavigate();
  const navElements = ["Help", "Contact Us"];
  const [activeTab, setActiveTab] = useState("signup");
  const [passwordValidation, setPasswordValidation] = useState();
  const [confirmPasswordValidation, setConfirmPasswordValidation] =
    useState(false);
  const [confirmPasswordDisabled, setConfirmPasswordDisabled] = useState(true);
  const [emailValidation, setEmailValidation] = useState(null);
  const [nameValidation, setNameValidation] = useState(null);
  const [authenticationValidation, setAuthenticationValidation] =
    useState(null);
  const [contactValidation, setContactValidation] = useState(null);
  const [signUpButton, setSignUpButton] = useState(false);
  const [signUpMessage, setSignUpMessage] = useState(null);
  const [signInMessage, setSignInMessage] = useState(null);
  //var for rendering delivery boy home page
  const [deliveryBoyPage, setDeliveryBoyPage] = useState();
  const { sessionId, setSessionId } = useContext(LoginContext);
  const { setLoggedIN, verifySession } = useAuth();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
    userType: "",
  });
  const [signUp, setSignUp] = useState({
    name: "",
    email: "",
    address: {
      houseNumber: "",
      street: "",
      city: "",
      country: "",
    },
    contact: null,
    password: "",
    confirmPassword: "",
    accountType: null,
  });

  useEffect(() => {
    // Check if all required fields are filled in and if password matches confirmPassword
    if (
      signUp.name &&
      signUp.address &&
      signUp.contact &&
      signUp.email &&
      signUp.password &&
      signUp.confirmPassword &&
      signUp.password === signUp.confirmPassword
    ) {
      setSignUpButton(true);
    } else {
      setSignUpButton(false);
    }
  }, [signUp]); // Re-run this effect whenever signUp object changes

  function handleSignInChange(event) {
    event.preventDefault();
    const { name, value } = event.target;

    if (name === "email") {
      if (isValidEmail(value) === false) {
        setEmailValidation("Enter Valid Email");
      } else {
        setEmailValidation(null);
      }
    }
    setSignIn((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  function handleSignUpChange(event) {
    event.preventDefault();
    const { name, value } = event.target;

    if (activeTab === "signup") {
      if (
        name === "houseNumber" ||
        name === "street" ||
        name === "city" ||
        name === "country"
      ) {
        setSignUp((prevValue) => ({
          ...prevValue,
          address: {
            ...prevValue.address,
            [name]: value,
          },
        }));
      } else {
        setSignUp((prevValue) => ({
          ...prevValue,
          [name]: value,
        }));
      }

      if (name === "email") {
        if (value.trim().length === 0) {
          setEmailValidation(null); // Clear any existing validation message
        } else {
          if (isValidEmail(value) === false) {
            setEmailValidation("Enter Valid Email");
          } else {
            setEmailValidation(null);
          }
        }
      }

      if (name === "name") {
        // Check if the value is empty
        if (value.trim().length === 0) {
          setNameValidation(null); // Clear any existing validation message
        } else {
          // Check if the length of the value is within the specified range
          const minLength = 4;

          // if (value.trim().length < minLength ) {
          //   setNameValidation(`Name should be greater than  ${minLength} `);

          // } else
          // Regular expression to match only letters and spaces
          const isValidName = /^[a-zA-Z\s]+$/.test(value);

          if (!isValidName) {
            setNameValidation("Enter Valid Name");
          } else {
            setNameValidation(null); // Clear any existing validation message
          }
        }
      }

      if (name === "contact") {
        if (!/^\d+$/.test(value.trim()) || value.trim().length < 10) {
          setContactValidation("Enter a numeric 10-digit number.");
        } else {
          setContactValidation(null);
        }

        if (value.trim().length === 0) {
          setContactValidation(null);
        }
      }

      if (name === "password") {
        // Enable Confirm Password if Password is not empty, otherwise disable it
        setConfirmPasswordDisabled(value === "");
        let charr = false;
        let alphabet = false;
        let number = false;

        for (const char of value) {
          if (!isNaN(parseInt(char))) {
            number = true;
          } else if (char.match(/[a-zA-Z]/)) {
            alphabet = true;
          } else {
            charr = true;
          }
        }

        if (!charr || !alphabet || !number || value.length < 8) {
          setPasswordValidation(
            "Password should be a combination of characters, alphabets, and numbers, and should be at least 8 characters long."
          );
        } else {
          setPasswordValidation(""); // Reset validation message if password meets requirements
        }
      }
      if (
        name === "confirmPassword" ||
        (name === "password" &&
          !passwordValidation &&
          signUp.password.length > 7)
      ) {
        if (value !== signUp.password) {
          setConfirmPasswordValidation(
            "Confirm password should be the same as password."
          );
        } else {
          setConfirmPasswordValidation(false); // Reset the validation message if passwords match
        }
      }
    } else if (activeTab === "signin") {
      setSignIn((prevValue) => ({
        ...prevValue,
        [name]: value,
      }));
    }

    console.log("signUp", signUp);
  }
  function isValidEmail(email) {
    const regex = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  // Usage example remains the same

  async function handleSignUpSubmit(event) {
    event.preventDefault();
    if (!signUp || signUp.name?.trim().length < 4) {
      window.alert("Enter name minimum of 4 characters.");
      return;
  }
  

    try {
      console.log("handlesubmit", signUp);
      const response = await axios.post(
        "http://localhost:3001/user/registerNewUser",
        { signUp }
      );
      console.log("response", response.message); // Log the entire response object
      console.log("response status", response.status); // Log the response status separately

      if (response.status === 200) {
        //display succesfull message
        // setSignUpMessage("Registration Successful");
        window.alert("Registration Successful")
        setActiveTab("signin")
        //set all the input to its default value
        setSignUp({
          name: "",
          email: "",
          address: {
            houseNumber: "",
            street: "",
            city: "",
            country: "",
          },
          contact: null,
          password: "",
          confirmPassword: "",
          accountType: "",
        });
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 409) {
        setSignUpMessage("User Already Registered");
      }

      
    }
  }

  async function handleSignInSubmit(event) {
    event.preventDefault();
    console.log("userType", signIn.userType);

    if (signIn.password.trim().length < 8) {
      window.alert("password should be minimum of 8 charachers");
      return;
    }
    if (signIn.userType === "") {
      window.alert("enter user type");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/user/authenticateLogIn",
        signIn
      );
      console.log("data", response.data);

      if (response.data.success) {
        console.log("userData recieve from server====", response.data.user);
        verifySession();
        setSessionId(response.data.sessionId);
        console.log("response.data.sessionId", response.data.sessionId);
        // if (userContext) {
        //   await userContext.setUserDetails(response.data.user);
        //   localStorage.setItem("user", JSON.stringify(response.data.user));
        //   console.log("response.data.user++++++", userContext.userDetails);
        // }
        if (userContext) {
          console.log("User context is defined");
          await userContext.setUserDetails(response.data.user);
          console.log("User details set:",await userContext.userDetails);
          console.log("User details stored in localStorage");
          try {
            localStorage.setItem("user", JSON.stringify(response.data.user));
          } catch (storageError) {
            console.error("Error setting localStorage:", storageError.message);
          }
        }
        console.log("sessionId", sessionId);
        userContext.setUserDetails(response.data.user);
        sessionStorage.setItem("sessionId", response.data.sessionId);


        //  return response.data
        if (
          signIn.email.toLowerCase() === "zohajaved2@gmail.com".toLowerCase() &&
          signIn.userType === "admin"
        ) {
          console.log("signIn.email.toLowerCase()", signIn.email.toLowerCase());

          navigate("/admin");
          return;
        }
        if (
          signIn.email.toLowerCase() === "janesmith1@gmail.com" ||
          signIn.email.toLowerCase() === "emilybrown1@gmail.com" ||
          (signIn.email.toLowerCase() === "johndoe1@gmail.com" &&
            signIn.userType === "employee")
        ) {
          setDeliveryBoyPage(signIn.email);
          return;
        } else {
          try {
            // console.log("signIn1",userContext)
            if (userContext) {
              userContext.setUserDetails(response.data.user);
            }
            navigate("/Home");
          } catch (err) {
            console.log(err);
          }
          setSignInMessage("SignIn Success");
        }
      }
      // Handle successful login response, e.g., update UI, redirect user, etc.
    } catch (error) {
      if (error.response && error.response.data.message) {
        if (error.response.status === 500) {
          setAuthenticationValidation("Password not matched");
        }
        if (error.response.status === 404) {
          console.log("Account does not exist");
          setAuthenticationValidation("Account not exists");
        }

        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }

  const buttonStyle = {
    height: "40px",
    width: "100px",
    padding: "5px",
    fontSize: "20px",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: "#0056b3",
  };

  const [signInHover, setSignInHover] = React.useState(false);
  const [signUpHover, setSignUpHover] = React.useState(false);

  return (
    <div
      style={{
        // backgroundImage:
        //   "url(https://plus.unsplash.com/premium_photo-1661774910035-05257f7d73a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b25saW5lJTIwc2hvcHBpbmd8ZW58MHx8MHx8fDA%3D)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display:'flex',
        flexDirection:'column',
        gap:'5px'
      }}
    >
      {/* this below div is for delivery boy page based on conditional rendering */}
      {deliveryBoyPage && <DeliveryBoy email={deliveryBoyPage} />}
      <div>
        {!deliveryBoyPage && (
          <div>
            <Navbars navElements={navElements} />
            <div className="container">
              <div className="form-wrapper">
                <ul className="nav-tabs">
                  <li
                    className={activeTab === "signup" ? "active" : ""}
                    onClick={() => handleTabClick("signup")}
                  >
                    Sign Up
                  </li>
                  <li
                    className={activeTab === "signin" ? "active" : ""}
                    onClick={() => handleTabClick("signin")}
                  >
                    Sign In
                  </li>
                </ul>

                <div className="form-content">
                  {activeTab === "signup" && (
                    <form
                      action="#"
                      method="post"
                      className="signup-form"
                      style={{
                        fontSize: "20px",
                        maxWidth: "600px",
                        margin: "0 auto",
                      }}
                    >
                      <h2 className="form-title">Create an Account</h2>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          gap: "20px",
                          width: "100%",
                        }}
                      >
                        <div
                          className="form-group"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "25px",
                            width: "100%",
                          }}
                        >
                          <label htmlFor="name" style={{ flexShrink: "0" }}>
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter Name"
                            value={signUp.name}
                            onChange={handleSignUpChange}
                            style={{
                              height: "40px",
                              width: "calc(100% - 75px)",
                              padding: "5px",
                              border: "2px solid #E1E1E1",
                              fontSize: "20px",
                              flexGrow: "1",
                            }}
                            maxLength="15"
                            required
                          />
                        </div>
                        {nameValidation && (
                          <span
                            style={{ color: "red", alignSelf: "flex-start" }}
                          >
                            {nameValidation}
                          </span>
                        )}
                        <div
                          className="form-group"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "25px",
                            width: "100%",
                          }}
                        >
                          <label htmlFor="email" style={{ flexShrink: "0" }}>
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter Email"
                            value={signUp.email}
                            onChange={handleSignUpChange}
                            style={{
                              height: "40px",
                              width: "calc(100% - 75px)",
                              padding: "5px",
                              border: "2px solid #E1E1E1",
                              fontSize: "20px",
                              flexGrow: "1",
                            }}
                            maxLength="30"
                            required
                          />
                        </div>
                        {emailValidation && (
                          <span
                            style={{ color: "red", alignSelf: "flex-start" }}
                          >
                            {emailValidation}
                          </span>
                        )}
                        <div
                          className="form-group"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "25px",
                            width: "100%",
                          }}
                        >
                          <label htmlFor="address" style={{ flexShrink: "0" }}>
                            Address
                          </label>
                          <div
                            className="address-fields"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                              width: "calc(100% - 75px)",
                            }}
                          >
                            <input
                              type="text"
                              id="houseNumber"
                              name="houseNumber"
                              placeholder="House Number"
                              value={signUp.address.houseNumber}
                              onChange={handleSignUpChange}
                              style={{
                                height: "40px",
                                padding: "5px",
                                border: "2px solid #E1E1E1",
                                fontSize: "20px",
                                flexGrow: "1",
                              }}
                              maxLength="10"
                              required
                            />
                            <input
                              type="text"
                              id="street"
                              name="street"
                              placeholder="Street"
                              value={signUp.address.street}
                              onChange={handleSignUpChange}
                              style={{
                                height: "40px",
                                padding: "5px",
                                border: "2px solid #E1E1E1",
                                fontSize: "20px",
                                flexGrow: "1",
                              }}
                              maxLength="15"
                              required
                            />
                            <input
                              type="text"
                              id="city"
                              name="city"
                              placeholder="City"
                              value={signUp.address.city}
                              onChange={handleSignUpChange}
                              style={{
                                height: "40px",
                                padding: "5px",
                                border: "2px solid #E1E1E1",
                                fontSize: "20px",
                                flexGrow: "1",
                              }}
                              maxLength="15"
                              required
                            />
                            <input
                              type="text"
                              id="country"
                              name="country"
                              placeholder="Country"
                              value={signUp.address.country}
                              onChange={handleSignUpChange}
                              style={{
                                height: "40px",
                                padding: "5px",
                                border: "2px solid #E1E1E1",
                                fontSize: "20px",
                                flexGrow: "1",
                              }}
                              maxLength="15"
                              required
                            />
                          </div>
                        </div>
                        <div
                          className="form-group"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "25px",
                            width: "100%",
                          }}
                        >
                          <label htmlFor="contact" style={{ flexShrink: "0" }}>
                            Contact Number
                          </label>
                          <input
                            type="tel"
                            id="contact"
                            name="contact"
                            placeholder="Enter Contact Number"
                            value={signUp.contact}
                            onChange={handleSignUpChange}
                            style={{
                              height: "40px",
                              width: "calc(100% - 125px)",
                              padding: "5px",
                              border: "2px solid #E1E1E1",
                              fontSize: "20px",
                              flexGrow: "1",
                            }}
                            maxLength={10}
                            required
                          />
                        </div>
                        {contactValidation && (
                          <span
                            style={{ color: "red", alignSelf: "flex-start" }}
                          >
                            {contactValidation}
                          </span>
                        )}
                        <div
                          className="form-group"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "25px",
                            width: "100%",
                          }}
                        >
                          <label htmlFor="password" style={{ flexShrink: "0" }}>
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter Password"
                            value={signUp.password}
                            onChange={handleSignUpChange}
                            style={{
                              height: "40px",
                              width: "calc(100% - 95px)",
                              padding: "5px",
                              border: "2px solid #E1E1E1",
                              fontSize: "20px",
                              flexGrow: "1",
                            }}
                            maxLength="15"
                            required
                          />
                        </div>
                        {passwordValidation && (
                          <span
                            style={{ color: "red", alignSelf: "flex-start" }}
                          >
                            {passwordValidation}
                          </span>
                        )}
                        <div
                          className="form-group"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "25px",
                            width: "100%",
                          }}
                        >
                          <label
                            htmlFor="confirmPassword"
                            style={{ flexShrink: "0" }}
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Repeat Password"
                            value={signUp.confirmPassword}
                            onChange={handleSignUpChange}
                            style={{
                              height: "40px",
                              width: "calc(100% - 145px)",
                              padding: "5px",
                              border: "2px solid #E1E1E1",
                              fontSize: "20px",
                              flexGrow: "1",
                            }}
                            disabled={confirmPasswordDisabled}
                            maxLength={15}
                            required
                          />
                        </div>
                        {confirmPasswordValidation && (
                          <p style={{ color: "red", alignSelf: "flex-start" }}>
                            {confirmPasswordValidation}
                          </p>
                        )}
                        <div
                          className="form-group form-check"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "25px",
                            width: "100%",
                            paddingLeft: "0",
                          }}
                        >
                          <label
                            htmlFor="accountType"
                            style={{ flexShrink: "0" }}
                          >
                            Account Type
                          </label>
                          <select
                            id="accountType"
                            name="accountType"
                            onChange={handleSignUpChange}
                            style={{
                              height: "50px",
                              width: "calc(100% - 125px)",
                              padding: "5px",

                              border: "2px solid #E1E1E1",
                              fontSize: "20px",
                              flexGrow: "1",
                            }}
                            required
                          >
                            <option value="" disabled>
                              Select Account Type
                            </option>
                            <option disabled>Select</option>
                            <option value="customer">Customer</option>
                            <option value="retailer">Retailer</option>
                          </select>
                        </div>
                      </div>
                      <div
                        className="form-group"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "25px",
                          width: "100%",
                        }}
                      >
                        <input
                          type="submit"
                          value="Sign Up"
                          className="btn btn-primary"
                          onClick={handleSignUpSubmit}
                          // style={{
                          //   height: "40px",
                          //   width: "100%",
                          //   padding: "5px",
                          //   fontSize: "20px",
                          //   borderRadius: "5px",
                          // }}
                          style={signUpHover ? buttonHoverStyle : buttonStyle}
                          onMouseEnter={() => setSignUpHover(true)}
                          onMouseLeave={() => setSignUpHover(false)}
                          disabled={!signUpButton}
                        />
                      </div>
                      {signUpMessage && (
                        <span
                          style={{ color: "Red", alignSelf: "flex-start" }}
                        >
                          {signUpMessage}
                        </span>
                      )}
                    </form>
                  )}

                  {activeTab === "signin" && (
                    <form
                      action="#"
                      method="post"
                      className="signin-form"
                      style={{
                        fontSize: "20px",
                        maxWidth: "600px",
                        margin: "0 auto",
                      }}
                    >
                      <h2 className="form-title">Sign In</h2>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          gap: "20px",
                          width: "100%",
                        }}
                      >
                        <div
                          className="form-group"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "25px",
                            width: "100%",
                          }}
                        >
                          <label htmlFor="email" style={{ flexShrink: "0" }}>
                            Email
                          </label>
                          <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Enter Email"
                            value={signIn.email}
                            onChange={handleSignInChange}
                            style={{
                              height: "50px",
                              width: "calc(100% - 75px)", // Adjusts for label width and gap
                              padding: "5px",
                              marginLeft: "39px",
                              border: "2px solid #E1E1E1",
                              fontSize: "20px",
                              flexGrow: "1",
                            }}
                            maxLength={30}
                            required
                          />
                        </div>
                        {emailValidation && (
                          <span
                            style={{ color: "red", alignSelf: "flex-start" }}
                          >
                            {emailValidation}
                          </span>
                        )}
                        <div
                          className="form-group"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "25px",
                            width: "100%",
                          }}
                        >
                          <label htmlFor="password" style={{ flexShrink: "0" }}>
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            placeholder="Enter Password"
                            name="password"
                            maxLength={10}
                            value={signIn.password}
                            onChange={handleSignInChange}
                            style={{
                              height: "50px",
                              width: "calc(100% - 95px)", // Adjusts for label width and gap
                              padding: "5px",
                              border: "2px solid #E1E1E1",
                              fontSize: "20px",
                              flexGrow: "1",
                            }}
                            required
                          />
                        </div>
                        <div
                          className="form-group"
                          style={{ display: "flex", gap: "35px" }}
                        >
                          <label>Type of User:</label>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <label
                              htmlFor="admin"
                              style={{ cursor: "pointer" }}
                            >
                              Admin
                            </label>
                            <input
                              type="radio"
                              id="admin"
                              name="userType"
                              value="admin"
                              style={{
                                height: "20px",
                                width: "20px",
                                accentColor: "green",
                                cursor: "pointer",
                              }}
                              onChange={handleSignInChange}
                              required
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <label
                              htmlFor="employee"
                              style={{ cursor: "pointer" }}
                            >
                              Employee
                            </label>
                            <input
                              type="radio"
                              id="employee"
                              name="userType"
                              value="employee"
                              style={{
                                height: "20px",
                                width: "20px",
                                accentColor: "green",
                                cursor: "pointer",
                              }}
                              onChange={handleSignInChange}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <label
                              htmlFor="customer"
                              style={{ cursor: "pointer" }}
                            >
                              Customer
                            </label>
                            <input
                              type="radio"
                              id="customer"
                              name="userType"
                              value="customer"
                              style={{
                                height: "20px",
                                width: "20px",
                                accentColor: "green",
                                cursor: "pointer",
                              }}
                              onChange={handleSignInChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          type="submit"
                          value="Sign In"
                          className="btn btn-primary"
                          onClick={handleSignInSubmit}
                          maxLength="15"
                          required
                          style={signInHover ? buttonHoverStyle : buttonStyle}
                          onMouseEnter={() => setSignInHover(true)}
                          onMouseLeave={() => setSignInHover(false)}
                        />
                      </div>
                      {authenticationValidation && (
                        <span style={{ color: "red" }}>
                          {authenticationValidation}
                        </span>
                      )}
                      <a href="#" className="forgot-password">
                        Forgot Password?
                      </a>
                      {signInMessage && (
                        <span style={{ color: "green" }}>{signInMessage}</span>
                      )}
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div style={{ backgroundColor: "black", marginTop: "5%" }}>
              <Footer />
            </div>
    </div>
  );
}

export default RegistrationForm;
