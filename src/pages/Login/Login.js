import { useState, useEffect, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { AuthContext, CartContext, WishListContext } from "../..";

import styles from "./login.module.css";
import { regexCheck } from "../../Common/Utility";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";

import { toast } from "react-toastify";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

const Login = () => {
  const navigate = useNavigate();

  const { isloggedIn, setUserToken, setIsLoggedIn, setUser } = useContext(AuthContext);
  const { getWishListAPI } = useContext(WishListContext);
  const { getCartItemsAPI } = useContext(CartContext);
  const location = useLocation();

  const [passwordType, setPasswordType] = useState("password");

  const [formValues, setFormValues] = useState({
    email: {
      value: "",
      error: "",
    },
    password: {
      value: "",
      error: "",
    },
  });
  const changeVisibility = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else {
      setPasswordType("text");
    }
  };
  const errorCheck = (fieldName, value) => {
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
  };

  const submitLoginHandler = async (e) => {
    e.preventDefault();
    let validationError = false;
    const { email, password } = formValues;

    errorCheck("email", email.value);
    errorCheck("password", password.value);

    validationError = email.value === "" || password.value === "" ? true : false;

    const errorFor = (validationError) => {
      for (const key in formValues) {
        if (formValues[key].error !== "") {
          validationError = true;
          break;
        }
      }
      return validationError;
    };
    if (!errorFor(validationError)) {
      const data = {
        email: email.value,
        password: password.value,
      };

      const url = "/api/auth/login";
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
        const { errors, encodedToken, foundUser } = data;

        if (!errors) {
          localStorage.setItem("userToken", encodedToken);
          localStorage.setItem("loggedUser", JSON.stringify(foundUser));
          setUserToken(encodedToken);
          setIsLoggedIn(true);
          setUser(foundUser);
          getWishListAPI(encodedToken);
          getCartItemsAPI(encodedToken);

          console.log(location);
          toast.success("Successfully logged In", {
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
          navigate(location?.state?.from?.pathname);
        } else {
          setFormValues((formValues) => ({
            ...formValues,
            password: {
              ...formValues.password,
              error: errors[0],
            },
          }));
          toast.error(`These credentials do not match our records. Please try again`, {
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

  // Redirect to userdetails if logged in
  // if (isloggedIn) {
  //   return <Navigate to="/userdetails" replace />;
  // }

  return (
    <>
      <Navbar />
      <div className={styles.loginParent}>
        <div className={styles.login}>
          <h3>Login</h3>
          <form onSubmit={submitLoginHandler}>
            <div className={styles.formWrapper}>
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
            </div>
            <button type="submit">Sign in</button>
            <span className={styles.account}>Dont't have an account?</span>
            <p className={styles.signupText} onClick={() => navigate("/signup")}>
              Signup
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
