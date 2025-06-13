import React, { useState, useContext } from "react";
import UserContext from "../context/users/createContext";
import { FiCheckCircle, FiUserPlus, FiMail, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";

function Signup() {
  const userHandler = useContext(UserContext);
  const { signUpUser } = userHandler;
  
  const [confirmPass, setConfirmPass] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  
  const [tempCred, setTempCred] = useState({
    email: "",
    password: "",
    name: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setTempCred({ ...tempCred, [name]: value });
    
    if (errors[name]) {
      setErrors(prev => ({...prev, [name]: ""}));
    }
    
    if ((name === "password" || name === "cpassword") && passwordMatchError) {
      setPasswordMatchError("");
    }
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;
    
    if (!tempCred.name) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (tempCred.name.length < 5) {
      newErrors.name = "Name should be at least 5 characters";
      isValid = false;
    }
    
    if (!tempCred.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(tempCred.email)) {
      newErrors.email = "Email address is invalid";
      isValid = false;
    }
    
    if (!tempCred.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (tempCred.password.length < 5) {
      newErrors.password = "Password should be at least 5 characters";
      isValid = false;
    }
    
    if (!confirmPass) {
      newErrors.confirmPass = "Please confirm your password";
      isValid = false;
    } else if (confirmPass !== tempCred.password) {
      setPasswordMatchError("Passwords do not match");
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const clickHandler = async (e) => {
    e.preventDefault();
    setPasswordMatchError(""); 
    
    if (validateForm()) {
      try {
        await signUpUser(tempCred);
        
        setIsAccountCreated(true);
        
        setTempCred({ email: "", password: "", name: "" });
        setConfirmPass("");
      } catch (error) {
        console.error("Signup error:", error);
      }
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
              <div className="card-header bg-primary text-white py-4">
                <div className="d-flex align-items-center justify-content-center">
                  <FiUserPlus className="me-2" size={28} />
                  <h1 className="h2 mb-0 text-center">Create Your Account</h1>
                </div>
              </div>
              
              <div className="card-body p-4 p-lg-5">
                {/* Success Message */}
                {isAccountCreated && (
                  <div className="alert alert-success d-flex align-items-center mb-4 fade-in">
                    <FiCheckCircle className="me-2" size={24} />
                    <div>
                      <h5 className="mb-0">Account Created Successfully!</h5>
                      <p className="mb-0 mt-1">Welcome to our community. You can now log in to your account.</p>
                    </div>
                  </div>
                )}
                
                <form>
                  {/* Name Field */}
                  <div className="mb-4">
                    <label htmlFor="name" className="form-label fw-bold d-flex align-items-center">
                      <FiUserPlus className="me-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-lg ${errors.name ? "is-invalid" : ""}`}
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      onChange={changeHandler}
                      value={tempCred.name}
                    />
                    {errors.name && (
                      <div className="invalid-feedback d-block text-danger mt-1">
                        {errors.name}
                      </div>
                    )}
                  </div>
                  
                  {/* Email Field */}
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-bold d-flex align-items-center">
                      <FiMail className="me-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      className={`form-control form-control-lg ${errors.email ? "is-invalid" : ""}`}
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      onChange={changeHandler}
                      value={tempCred.email}
                    />
                    {errors.email && (
                      <div className="invalid-feedback d-block text-danger mt-1">
                        {errors.email}
                      </div>
                    )}
                    <div className="form-text mt-2">
                      We'll never share your email with anyone else.
                    </div>
                  </div>
                  
                  {/* Password Field */}
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-bold d-flex align-items-center">
                      <FiLock className="me-2" />
                      Password
                    </label>
                    <input
                      type="password"
                      className={`form-control form-control-lg ${errors.password ? "is-invalid" : ""}`}
                      id="password"
                      name="password"
                      placeholder="Create a password"
                      onChange={changeHandler}
                      value={tempCred.password}
                    />
                    {errors.password && (
                      <div className="invalid-feedback d-block text-danger mt-1">
                        {errors.password}
                      </div>
                    )}
                    <div className="form-text mt-2">
                      Password must be at least 5 characters long.
                    </div>
                  </div>
                  
                  {/* Confirm Password Field */}
                  <div className="mb-4">
                    <label htmlFor="cpassword" className="form-label fw-bold d-flex align-items-center">
                      <FiLock className="me-2" />
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className={`form-control form-control-lg ${errors.confirmPass || passwordMatchError ? "is-invalid" : ""}`}
                      id="cpassword"
                      name="cpassword"
                      placeholder="Confirm your password"
                      onChange={(e) => {
                        setConfirmPass(e.target.value);
                        if (passwordMatchError) setPasswordMatchError("");
                      }}
                      value={confirmPass}
                    />
                    {errors.confirmPass && (
                      <div className="invalid-feedback d-block text-danger mt-1">
                        {errors.confirmPass}
                      </div>
                    )}
                    {passwordMatchError && (
                      <div className="invalid-feedback d-block text-danger mt-1">
                        {passwordMatchError}
                      </div>
                    )}
                  </div>
                  
                  {/* Submit Button */}
                  <div className="d-grid mt-4">
                    <button
                      onClick={clickHandler}
                      type="submit"
                      className="btn btn-primary btn-lg fw-bold py-3"
                      disabled={isAccountCreated}
                    >
                      {isAccountCreated ? (
                        <>
                          <FiCheckCircle className="me-2" />
                          Account Created
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </button>
                  </div>
                  
                  {/* Login Link */}
                  <div className="mt-4 text-center">
                    <p className="mb-0 text-muted">
                      Already have an account? 
                      <Link to="/login" className="text-primary fw-bold ms-1 text-decoration-none">
                        Log in
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add custom styles */}
      <style jsx>{`
        .card {
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.1) !important;
        }
        .form-control-lg {
          padding: 0.8rem 1rem;
          border-radius: 0.7rem;
        }
        .btn-lg {
          border-radius: 0.7rem;
        }
        .fade-in {
          animation: fadeIn 0.5s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card-header {
          border-top-left-radius: 1rem !important;
          border-top-right-radius: 1rem !important;
        }
      `}</style>
    </div>
  );
}

export default Signup;