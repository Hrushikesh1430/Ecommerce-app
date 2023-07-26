import styles from "./address.module.css";
import { AuthContext, DataContext } from "../..";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { v4 as uuid } from "uuid";

import { toast } from "react-toastify";

export const AddressForm = (props) => {
  console.log(props.edit);
  const { user } = useContext(AuthContext);
  const { setAddress } = useContext(DataContext);

  const navigate = useNavigate();

  const intitalValues = {
    name: {
      value: "",
      error: "",
    },
    phone: {
      value: "",
      error: "",
    },
    residence: {
      value: "",
      error: "",
    },
    area: {
      value: "",
      error: "",
    },
    city: {
      value: "Select your city",
      error: "",
    },
    state: {
      value: "Select your state",
      error: "",
    },
    pincode: {
      value: "",
      error: "",
    },
  };

  const [formValues, setFormValues] = useState(intitalValues);

  useEffect(() => {
    props.edit &&
      setFormValues((formValues) => ({
        ...formValues,
        name: {
          ...formValues.name,
          value: props.addressValue.name,
        },
        phone: {
          ...formValues.name,
          value: props.addressValue.phone,
        },
        residence: {
          ...formValues.name,
          value: props.addressValue.residence,
        },
        area: {
          ...formValues.name,
          value: props.addressValue.area,
        },
        city: {
          ...formValues.name,
          value: props.addressValue.city,
        },
        state: {
          ...formValues.name,
          value: props.addressValue.state,
        },
        pincode: {
          ...formValues.name,
          value: props.addressValue.pincode,
        },
      }));
  }, []);

  const errorCheck = (fieldName, value) => {
    if (fieldName === "name") {
      if (value === "") {
        setFormValues((formValues) => ({
          ...formValues,
          name: {
            ...formValues.name,
            error: "First Name cannot be empty",
          },
        }));
      } else {
        setFormValues((formValues) => ({
          ...formValues,
          name: {
            ...formValues.name,
            error: "",
          },
        }));
      }
    }
    if (fieldName === "phone") {
      let validPhoneRegex = /^(\+91|\+91\-|0)?[789]\d{9}$/;

      if (value === "") {
        setFormValues((formValues) => ({
          ...formValues,
          phone: {
            ...formValues.phone,
            error: "Phone cannot be empty",
          },
        }));
      } else if (!validPhoneRegex.test(value)) {
        setFormValues((formValues) => ({
          ...formValues,
          phone: {
            ...formValues.phone,
            error: "Enter a valid phone number",
          },
        }));
      } else {
        setFormValues((formValues) => ({
          ...formValues,
          phone: {
            ...formValues.phone,
            error: "",
          },
        }));
      }
    }
    if (fieldName === "residence") {
      if (value === "") {
        setFormValues((formValues) => ({
          ...formValues,
          residence: {
            ...formValues.residence,
            error: "Residence cannot be empty",
          },
        }));
      } else {
        setFormValues((formValues) => ({
          ...formValues,
          residence: {
            ...formValues.residence,
            error: "",
          },
        }));
      }
    }
    if (fieldName === "area") {
      if (value === "") {
        setFormValues((formValues) => ({
          ...formValues,
          area: {
            ...formValues.area,
            error: "Area cannot be empty",
          },
        }));
      } else {
        setFormValues((formValues) => ({
          ...formValues,
          area: {
            ...formValues.area,
            error: "",
          },
        }));
      }
    }
    if (fieldName === "pincode") {
      if (value === "") {
        setFormValues((formValues) => ({
          ...formValues,
          pincode: {
            ...formValues.pincode,
            error: "Pincode cannot be empty",
          },
        }));
      } else {
        setFormValues((formValues) => ({
          ...formValues,
          pincode: {
            ...formValues.pincode,
            error: "",
          },
        }));
      }
    }
    if (fieldName === "city") {
      if (value === "Select your city") {
        setFormValues((formValues) => ({
          ...formValues,
          city: {
            ...formValues.city,
            error: "Please select a city",
          },
        }));
      } else {
        setFormValues((formValues) => ({
          ...formValues,
          city: {
            ...formValues.city,
            error: "",
          },
        }));
      }
    }
    if (fieldName === "state") {
      if (value === "Select your state") {
        setFormValues((formValues) => ({
          ...formValues,
          state: {
            ...formValues.state,
            error: "Please select a state",
          },
        }));
      } else {
        setFormValues((formValues) => ({
          ...formValues,
          state: {
            ...formValues.state,
            error: "",
          },
        }));
      }
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let validationError = false;
    const { name, phone, residence, city, state, pincode, area } = formValues;

    const errorFor = (validationError) => {
      for (const key in formValues) {
        if (formValues[key].error !== "" || formValues[key].error !== "Please select a city" || formValues[key].error !== "Please select a state") {
          validationError = true;
          break;
        }
      }
      return validationError;
    };

    console.log(formValues);
    errorCheck("name", name.value);
    errorCheck("phone", phone.value);
    errorCheck("residence", residence.value);
    errorCheck("city", city.value);
    errorCheck("state", state.value);
    errorCheck("area", area.value);
    errorCheck("pincode", pincode.value);

    validationError =
      name.value === "" ||
      phone.value === "" ||
      residence.value === "" ||
      city.value === "Select your city" ||
      pincode.value === "" ||
      state.value === "Select your state" ||
      area.value === ""
        ? true
        : false;

    !validationError && errorFor(validationError);

    if (!validationError) {
      let newAddress = residence.value + " " + area.value + " " + city.value + "-" + pincode.value + " " + state.value;

      const data = {
        userId: user.id,
        id: props.edit ? props.addressValue.id : uuid(),
        name: name.value,
        phone: phone.value,
        residence: residence.value,
        area: area.value,
        city: city.value,
        state: state.value,
        pincode: pincode.value,
      };

      props.edit
        ? setAddress((address) => address.map((item) => (item.id === props.addressValue.id ? data : item)))
        : setAddress((address) => [...address, data]);
      toast.success(`${props.edit ? "Address Edited" : "Address added to the directory"}`, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      props.setAddressModal(false);
    }
  };

  return (
    <>
      <div className={styles.addressForm}>
        <h3>{props.edit ? "Edit Address" : "Add Address"}</h3>
        <form onSubmit={submitHandler} className={styles.mainForm}>
          <div className={styles.formWrapper}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className={`${styles.name} ${formValues.name.error !== "" && styles.error}`}
                value={formValues.name.value}
                id="name"
                name="name"
                onChange={(e) => {
                  setFormValues((formValues) => ({
                    ...formValues,
                    name: {
                      ...formValues.name,
                      value: e.target.value,
                    },
                  }));
                  errorCheck("name", e.target.value);
                }}
              />
              {formValues.name.error !== "" && <span className={styles.warning}>{formValues.name.error}</span>}
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className={`${styles.phone} ${formValues.phone.error !== "" && styles.error}`}
                value={formValues.phone.value}
                id="phone"
                name="phone"
                onChange={(e) => {
                  var numberRegex = /^\d+$/;
                  (numberRegex.test(e.target.value) || e.target.value === "") &&
                    setFormValues((formValues) => ({
                      ...formValues,
                      phone: { ...formValues.phone, value: e.target.value },
                    }));
                  errorCheck("phone", e.target.value);
                }}
              />
              {formValues.phone.error !== "" && <span className={styles.warning}>{formValues.phone.error}</span>}
            </div>
            <div>
              <label htmlFor="residence">Flat no / Building Name </label>
              <input
                type="text"
                className={`${styles.residence} ${formValues.residence.error !== "" && styles.error}`}
                id="residence"
                name="residence"
                value={formValues.residence.value}
                onChange={(e) => {
                  setFormValues((formValues) => ({
                    ...formValues,
                    residence: {
                      ...formValues.residence,
                      value: e.target.value,
                    },
                  }));
                  errorCheck("residence", e.target.value);
                }}
              />
              {formValues.residence.error !== "" && <span className={styles.warning}>{formValues.residence.error}</span>}
            </div>
            <div>
              <label htmlFor="area"> Area, Street, Sector, Village</label>
              <input
                type="text"
                className={`${styles.area} ${formValues.area.error !== "" && styles.error}`}
                id="area"
                name="area"
                value={formValues.area.value}
                onChange={(e) => {
                  setFormValues((formValues) => ({
                    ...formValues,
                    area: { ...formValues.area, value: e.target.value },
                  }));
                  errorCheck("area", e.target.value);
                }}
              />
              {formValues.area.error !== "" && <span className={styles.warning}>{formValues.area.error}</span>}
            </div>
            <div>
              <label htmlFor="city">City</label>
              <select
                className={`${styles.city} ${formValues.city.error !== "" && styles.error}`}
                value={formValues.city.value}
                onChange={(e) => {
                  setFormValues((formValues) => ({
                    ...formValues,
                    city: {
                      ...formValues.city,
                      value: e.target.value,
                    },
                  }));
                  errorCheck("city", e.target.value);
                }}
              >
                <option value="Select your city">Select your city</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Thane">Thane</option>
              </select>
              {formValues.city.error !== "" && <span className={styles.warning}>{formValues.city.error}</span>}
            </div>
            <div>
              <label htmlFor="state">State</label>
              <select
                className={`${styles.state} ${formValues.state.error !== "" && styles.error}`}
                value={formValues.state.value}
                onChange={(e) => {
                  setFormValues((formValues) => ({
                    ...formValues,
                    state: {
                      ...formValues.state,
                      value: e.target.value,
                    },
                  }));
                  errorCheck("state", e.target.value);
                }}
              >
                <option value="Select your state">Select your state</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Goa">Goa</option>
              </select>
              {formValues.state.error !== "" && <span className={styles.warning}>{formValues.state.error}</span>}
            </div>
            <div>
              <label htmlFor="pincode">Pincode</label>
              <input
                type="text"
                className={`${styles.pincode} ${formValues.pincode.error !== "" && styles.error}`}
                id="pincode"
                name="pincode"
                onChange={(e) => {
                  setFormValues((formValues) => ({
                    ...formValues,
                    pincode: { ...formValues.pincode, value: e.target.value },
                  }));
                  errorCheck("pincode", e.target.value);
                }}
                value={formValues.pincode.value}
              />
              {formValues.pincode.error !== "" && <span className={styles.warning}>{formValues.pincode.error}</span>}
            </div>
          </div>
          <button type="submit">{props.edit ? "Edit Address" : "Add Address"}</button>
        </form>
      </div>
    </>
  );
};
