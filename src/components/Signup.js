import React, { useState, useContext } from "react";
import UserContext from "../context/users/createContext";

function Signup() {
  const userHandler = useContext(UserContext);
  const { signUpUser } = userHandler;
  const [confirmPass, setConfirmPass] = useState("");
  const [tempCred, setTempCred] = useState({
    email: "",
    password: "",
    name: "",
  });
  const changeHandler = (e) => {
    setTempCred({ ...tempCred, [e.target.name]: e.target.value });
  };
  const clickHandler = (e) => {
    e.preventDefault();
    if (confirmPass !== tempCred.password) {
      console.log("passwords does not match");
    } else {
      signUpUser(tempCred);
    }
  };
  return (
    <div>
      <div className="container my-5">
        <form>
          <div className="mb-3">
            <h2 htmlFor="exampleInputEmail1" className="form-label my-3">
              Name
            </h2>
            <input
              type="email"
              className="form-control"
              id="name"
              name="name"
              aria-describedby="emailHelp"
              onChange={changeHandler}
            />
            <h2 htmlFor="exampleInputEmail1" className="form-label my-3">
              Email address
            </h2>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              aria-describedby="emailHelp"
              onChange={changeHandler}
            />
            <div id="emailHelp" className="form-text">
              Enter a unique email address
            </div>
          </div>
          <div className="mb-3">
            <h2 htmlFor="exampleInputPassword1" className="form-label">
              Password
            </h2>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={changeHandler}
            />
            <h2 htmlFor="exampleInputPassword1" className="form-label my-3">
              Confirm Password
            </h2>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              onChange={(e) => {
                setConfirmPass(e.target.value);
              }}
            />
          </div>

          <button
            onClick={clickHandler}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
