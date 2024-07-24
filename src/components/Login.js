import React, {useState, useContext} from "react";
import UserContext from "../context/users/createContext";

function Login() {

    const userHandler = useContext(UserContext);
    const {loginUser} = userHandler;

    const [tempCred, setTempCred] = useState({
        email: "",
        password: "",
      });
  const changeHandler = (e) => {
    setTempCred({ ...tempCred, [e.target.name]: e.target.value });
  };

  const clickHandler = (e) => {
    e.preventDefault();
    loginUser(tempCred);
  }
  return (
    <div className="container my-5">
      <form>
        <div className="mb-3">
          <h2 htmlFor="exampleInputEmail1" className="form-label">
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
            id="exampleInputPassword1"
            name="password"
            onChange={changeHandler}
          />
        </div>

        <button onClick={clickHandler} type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
