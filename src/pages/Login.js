import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLoginHandler = async (e) => {
    e.preventDefault();
    const data = {
      email: "hdtawde@gmail.com",
      password: "12345",
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
      console.log(data);
      localStorage.setItem("token", data.encodedToken);
    } catch (error) {}
  };
  return (
    <div>
      <form onSubmit={submitLoginHandler}>
        <h3>Login</h3>
        <label for="email">Email</label>
        <input
          type="email"
          className="email"
          id="email"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label for="password">Password</label>
        <input
          type="password"
          className="password"
          id="password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default Login;
