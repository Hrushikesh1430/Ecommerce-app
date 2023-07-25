import { useEffect, useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import { AuthContext } from "../..";
import { regexCheck } from "../../Common/Utility";

import styles from "./signup.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const { checkLogin, isloggedIn } = useContext(AuthContext);

  const intitalValues = {
    firstName: {
      value: "",
      error: "",
    },
    lastName: {
      value: "",
      error: "",
    },
    email: {
      value: "",
      error: "",
    },
    password: {
      value: "",
      error: "",
    },
    confirmPassword: {
      value: "",
      error: "",
    },
  };

  const [formValues, setFormValues] = useState(intitalValues);

  const [passwordType, setPasswordType] = useState("password");

  const changeVisibility = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else {
      setPasswordType("text");
    }
  };

  const errorCheck = (fieldName, value) => {
    if (fieldName === "firstName") {
      if (value === "") {
        setFormValues((formValues) => ({
          ...formValues,
          firstName: {
            ...formValues.firstName,
            error: "First Name cannot be empty",
          },
        }));
      } else {
        setFormValues((formValues) => ({
          ...formValues,
          firstName: {
            ...formValues.firstName,
            error: "",
          },
        }));
      }
    }
    if (fieldName === "lastName") {
      if (value === "") {
        setFormValues((formValues) => ({
          ...formValues,
          lastName: {
            ...formValues.lastName,
            error: "Last Name cannot be empty",
          },
        }));
      } else {
        setFormValues((formValues) => ({
          ...formValues,
          lastName: {
            ...formValues.lastName,
            error: "",
          },
        }));
      }
    }
    if (fieldName === "email") {
      let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
      let emailCheck = regexCheck(value, regex);
      if (value === "") {
        setFormValues((formValues) => ({
          ...formValues,
          email: {
            ...formValues.email,
            error: "Email address cannot be empty",
          },
        }));
      } else if (!emailCheck) {
        setFormValues((formValues) => ({
          ...formValues,
          email: {
            ...formValues.email,
            error: "Please enter a valid email address",
          },
        }));
      } else {
        setFormValues((formValues) => ({
          ...formValues,
          email: {
            ...formValues.email,
            error: "",
          },
        }));
      }
    }
    if (fieldName === "password") {
      if (value === "") {
        setFormValues((formValues) => ({
          ...formValues,
          password: {
            ...formValues.password,
            error: "Password cannot be empty",
          },
        }));
      } else {
        setFormValues((formValues) => ({
          ...formValues,
          password: {
            ...formValues.password,
            error: "",
          },
        }));
      }
    }
    if (fieldName === "confirmPassword") {
      if (value === "") {
        setFormValues((formValues) => ({
          ...formValues,
          confirmPassword: {
            ...formValues.confirmPassword,
            error: "Field cannot be empty",
          },
        }));
      } else {
        setFormValues((formValues) => {
          return formValues.confirmPassword.value !== formValues.password.value
            ? {
                ...formValues,
                confirmPassword: {
                  ...formValues.confirmPassword,
                  error: "Password and confirm passwords do not match",
                },
              }
            : {
                ...formValues,
                confirmPassword: {
                  ...formValues.confirmPassword,
                  error: "",
                },
              };
        });
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let validationError = false;
    const { firstName, lastName, email, password, confirmPassword } = formValues;

    const errorFor = (validationError) => {
      for (const key in formValues) {
        if (formValues[key].error !== "") {
          return true;
        }
      }
      return validationError;
    };

    errorCheck("firstName", firstName.value);
    errorCheck("lastName", lastName.value);
    errorCheck("email", email.value);
    errorCheck("password", password.value);
    errorCheck("confirmPassword", confirmPassword.value);

    validationError =
      firstName.value === "" || lastName.value === "" || email.value === "" || password.value === "" || confirmPassword.value === "" ? true : false;

    if (!validationError) {
      validationError = errorFor(validationError);
    }

    if (!validationError) {
      const data = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
      };

      const url = "/api/auth/signup";
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      try {
        const response = await fetch(url, config);
        const data = await response.json();
        const { errors } = data;
        console.log(data);
        if (!errors) {
          // localStorage.setItem("userToken", encodedToken);
          toast.success(`User Created successfully`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
          // navigate("/login");
        } else {
          toast.error(`User Already Exists. Please try with some other credentials`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        }
      } catch (error) {
      } finally {
      }
    }
  };

  if (isloggedIn) {
    return <Navigate to="/userdetails" replace />;
  }
  return (
    <>
      <Navbar />
      <div className={styles.signupParent}>
        <div className={styles.signup}>
          <h3>Signup</h3>
          <form onSubmit={submitHandler}>
            <div className={styles.formWrapper}>
              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className={`${styles.firstName} ${formValues.firstName.error !== "" && styles.error}`}
                  id="firstName"
                  name="firstName"
                  onChange={(e) => {
                    setFormValues((formValues) => ({
                      ...formValues,
                      firstName: { ...formValues.firstName, value: e.target.value },
                    }));
                    errorCheck("firstName", e.target.value);
                  }}
                />
                {formValues.firstName.error !== "" && <span className={styles.warning}>{formValues.firstName.error}</span>}
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className={`${styles.lastName} ${formValues.lastName.error !== "" && styles.error}`}
                  id="lastName"
                  name="lastName"
                  onChange={(e) => {
                    setFormValues((formValues) => ({
                      ...formValues,
                      lastName: { ...formValues.lastName, value: e.target.value },
                    }));
                    errorCheck("lastName", e.target.value);
                  }}
                />
                {formValues.lastName.error !== "" && <span className={styles.warning}>{formValues.lastName.error}</span>}
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className={`${styles.email} ${formValues.email.error !== "" && styles.error}`}
                  id="signupemail"
                  name="email"
                  onChange={(e) => {
                    setFormValues((formValues) => ({
                      ...formValues,
                      email: { ...formValues.email, value: e.target.value },
                    }));
                    errorCheck("email", e.target.value);
                  }}
                />
                {formValues.email.error !== "" && <span className={styles.warning}>{formValues.email.error}</span>}
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={passwordType}
                    className={`${styles.password} ${formValues.password.error !== "" && styles.error}`}
                    id="signupassword"
                    name="password"
                    onChange={(e) => {
                      setFormValues((formValues) => ({
                        ...formValues,
                        password: { ...formValues.password, value: e.target.value },
                      }));
                      errorCheck("password", e.target.value);
                    }}
                  />
                  <RemoveRedEyeOutlinedIcon className={styles.eye} onClick={() => changeVisibility()} />
                </div>

                {formValues.password.error !== "" && <span className={styles.warning}>{formValues.password.error}</span>}
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className={`${styles.password} ${formValues.confirmPassword.error !== "" && styles.error}`}
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={(e) => {
                    setFormValues((formValues) => ({
                      ...formValues,
                      confirmPassword: {
                        ...formValues.confirmPassword,
                        value: e.target.value,
                      },
                    }));
                    errorCheck("confirmPassword", e.target.value);
                  }}
                />
                {formValues.confirmPassword.error !== "" && <span className={styles.warning}>{formValues.confirmPassword.error}</span>}
              </div>
            </div>
            <button type="submit">Sign up</button>
            <span className={styles.registered}>Already a registered user?</span>
            <p className={styles.loginText} onClick={() => navigate("/login")}>
              Sign in
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
