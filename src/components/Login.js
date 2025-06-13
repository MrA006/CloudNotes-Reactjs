import React, { useState, useContext } from "react";
import UserContext from "../context/users/createContext";
import NoteContext from "../context/notes/createContext";
import { FiMail, FiLock, FiLogIn, FiAlertCircle } from "react-icons/fi";

function Login(props) {
  const userHandler = useContext(UserContext);
  const noteHandler = useContext(NoteContext);
  const { loginUser } = userHandler;
  const { getNotes } = noteHandler;

  const [tempCred, setTempCred] = useState({
    email: "",
    password: "",
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setTempCred({ ...tempCred, [name]: value });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;
    
    // Email validation
    if (!tempCred.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(tempCred.email)) {
      newErrors.email = "Email address is invalid";
      isValid = false;
    }
    
    // Password validation
    if (!tempCred.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (tempCred.password.length < 5) {
      newErrors.password = "Password should be at least 5 characters";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const clickHandler = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        setLoading(true);
        const check = await loginUser(tempCred);
        
        if (check) {
          getNotes();
          props.showAlert('Logged in successfully', 'success');
        } else {
          props.showAlert('Login unsuccessful. Check your credentials.', 'error');
        }
      } catch (error) {
        props.showAlert('An error occurred during login', 'error');
        console.error("Login error:", error);
      } finally {
        setLoading(false);
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
                  <FiLogIn className="me-2" size={28} />
                  <h1 className="h2 mb-0 text-center">Welcome Back</h1>
                </div>
              </div>
              
              <div className="card-body p-4 p-lg-5">
                <form>
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
                      <div className="invalid-feedback d-flex align-items-center mt-1">
                        <FiAlertCircle className="me-1" />
                        {errors.email}
                      </div>
                    )}
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
                      placeholder="Enter your password"
                      onChange={changeHandler}
                      value={tempCred.password}
                    />
                    {errors.password && (
                      <div className="invalid-feedback d-flex align-items-center mt-1">
                        <FiAlertCircle className="me-1" />
                        {errors.password}
                      </div>
                    )}
                    <div className="form-text mt-2">
                      <a href="#" className="text-decoration-none">Forgot password?</a>
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <div className="d-grid mt-4">
                    <button
                      onClick={clickHandler}
                      type="submit"
                      className="btn btn-primary btn-lg fw-bold py-3"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Logging in...
                        </>
                      ) : (
                        <>
                          <FiLogIn className="me-2" />
                          Login
                        </>
                      )}
                    </button>
                  </div>
                  
                  {/* Signup Link */}
                  <div className="mt-4 text-center">
                    <p className="mb-0 text-muted">
                      Don't have an account? 
                      <a href="/signup" className="text-primary fw-bold ms-1 text-decoration-none">
                        Sign up
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom Styles */}
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
        .card-header {
          border-top-left-radius: 1rem !important;
          border-top-right-radius: 1rem !important;
        }
        .invalid-feedback {
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  );
}

export default Login;