import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./signup.module.css";
import { regexCheck } from "../Common/Utility";

const Signup = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
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
  });

  const [passwordType, setPasswordType] = useState("password");

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
    const { firstName, lastName, email, password, confirmPassword } =
      formValues;

    errorCheck("firstName", firstName.value);
    errorCheck("lastName", lastName.value);
    errorCheck("email", email.value);
    errorCheck("password", password.value);
    errorCheck("confirmPassword", confirmPassword.value);

    validationError =
      firstName.value === "" ||
      lastName.value === "" ||
      email.value === "" ||
      password.value === "" ||
      confirmPassword.value === ""
        ? true
        : false;

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
        const { errors, encodedToken } = data;
        console.log(data);
        if (!errors) {
          localStorage.setItem("token", encodedToken);
          navigate("/login");
        } else {
          alert("User already exists");
        }
      } catch (error) {
      } finally {
      }
    }
  };
  return (
    <>
      <div className={styles.signup}>
        <form onSubmit={submitHandler}>
          <h3>Signup</h3>
          <label for="firstName">First Name</label>
          <input
            type="text"
            className={`${styles.firstName} ${
              formValues.firstName.error !== "" && styles.error
            }`}
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
          {formValues.firstName.error !== "" && (
            <span className={styles.warning}>{formValues.firstName.error}</span>
          )}
          <label for="lastName">Last Name</label>
          <input
            type="text"
            className={`${styles.lastName} ${
              formValues.lastName.error !== "" && styles.error
            }`}
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
          {formValues.lastName.error !== "" && (
            <span className={styles.warning}>{formValues.lastName.error}</span>
          )}
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
            type={passwordType}
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
          <div>
            <input
              type="checkbox"
              onChange={(e) =>
                e.target.checked
                  ? setPasswordType("text")
                  : setPasswordType("password")
              }
            />
            <label for="showPassword" className={styles.showPasswordLabel}>
              Show Password
            </label>
          </div>
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className={`${styles.password} ${
              formValues.confirmPassword.error !== "" && styles.error
            }`}
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
          {formValues.confirmPassword.error !== "" && (
            <span className={styles.warning}>
              {formValues.confirmPassword.error}
            </span>
          )}
          <button type="submit">Sign up</button>
        </form>
      </div>
    </>
  );
};

export default Signup;
