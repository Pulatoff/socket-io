import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URL } from "../utils/config";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const sendLogin = async (e) => {
    e.preventDefault();
    const resp = await axios.post(
      `${URL}api/v1/users/signin`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    if (resp.status) {
      console.log(resp.data.data);
      console.log(resp.status);
      navigate("/");
    }
  };
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={sendLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
