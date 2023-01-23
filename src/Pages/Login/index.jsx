import React from "react";
import "./style.css";
import { MdFaceUnlock, MdOutlineLock } from "react-icons/md";
import { useUserAuthContext } from "../../context/userAuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const { signIn, user } = useUserAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate("/dashboard");
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("uid", JSON.stringify(user.uid));

      getDataByIdOfUser();
    } catch (error) {
      // console.log(error.message);
      setError(error.message);
    }
  };

  let getDataByIdOfUser = () => {
    const headers = {
      accept: "application/json",
    };
    axios
      .get(
        `https://sociallink-ab726-default-rtdb.firebaseio.com/users/${user?.uid}.json`,

        {
          headers: headers,
        }
      )
      .then((res) => {
        // setCurrentDataOfUser(res?.data);
        localStorage.setItem("currentUser", JSON.stringify(res?.data));
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="login-container">
      <div className="box-container">
        <div className="login">Login</div>
        <form onSubmit={onLogin}>
          <label className="custom-field two">
            <MdFaceUnlock />
            {/* <input type="url" placeholder="&nbsp;" /> */}
            <input
              id="email"
              name="email"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="&nbsp;"
            />
            <span className="placeholder">Enter Email</span>
          </label>

          <label className="custom-field two">
            <MdOutlineLock />
            {/* <input type="url" placeholder="&nbsp;" /> */}
            {/* <input type="password" placeholder="&nbsp;" /> */}
            <input
              id="password"
              name="password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="&nbsp;"
            />
            <span className="placeholder">Enter Password</span>
          </label>
          <div className="error">{error}</div>
          <button type="submit">login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
