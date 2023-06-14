import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./login.module.css";
import { regexCheck } from "../Common/Utility";

const Login = () => {
  const navigate = useNavigate();
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

    validationError =
      email.value === "" || password.value === "" ? true : false;

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
        const { errors, encodedToken } = data;
        console.log(data);
        if (!errors) {
          localStorage.setItem("token", encodedToken);
          navigate("/");
        } else {
          setFormValues((formValues) => ({
            ...formValues,
            password: {
              ...formValues.password,
              error: errors[0],
            },
          }));
        }
      } catch (error) {
      } finally {
      }
    }
  };
  return (
    <div className={styles.login}>
      <form onSubmit={submitLoginHandler}>
        <h3>Login</h3>
        <label for="email">Email</label>
        <input
          type="email"
          className={`${styles.email} ${
            formValues.email.error !== "" && styles.error
          }`}
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
        {formValues.email.error !== "" && (
          <span className={styles.warning}>{formValues.email.error}</span>
        )}
        <label for="password">Password</label>
        <input
          type={"password"}
          className={`${styles.password} ${
            formValues.password.error !== "" && styles.error
          }`}
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
        {formValues.password.error !== "" && (
          <span className={styles.warning}>{formValues.password.error}</span>
        )}
        <button type="submit">Sign in</button>
        <span>Dont't have an account?</span>
        <p className={styles.signupText} onClick={() => navigate("/signup")}>
          Signup
        </p>
      </form>
    </div>
  );
};

export default Login;
