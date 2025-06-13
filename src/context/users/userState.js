import { useNavigate } from "react-router-dom";
import UserContext from "./createContext";
import Cookies from 'js-cookie';

const UserState = (props) => {
  const navi = useNavigate();

  // Login User and get auth token
  const loginUser = async (credentials) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });
      
      const res = await response.json();
      
      if (res.success) {
        // Set auth token in cookie with expiration (7 days)
        Cookies.set('auth-token', res.token, {
          expires: 7, // days
          secure: process.env.NODE_ENV === 'production', // secure in production
          sameSite: 'strict',
          path: '/'
        });
        
        // Set logged status in localStorage (if needed for UI state)
        localStorage.setItem('logged', "true");
        navi('/');
        return true;
      } else {
        throw new Error(res.error || 'Incorrect credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(error.message || 'Login failed. Please try again.');
      return false;
    }
  }

  // Create User
  const signUpUser = async (credentials) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });

      const authToken = await response.json();
      
      if (authToken.success) {
        // Set auth token in cookie
        Cookies.set('auth-token', authToken.token, {
          expires: 7,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/'
        });
        
        // Set logged status
        localStorage.setItem('logged', "true");
        navi('/');
        return true;
      } else {
        throw new Error(authToken.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert(error.message || 'Registration failed. Please try again.');
      return false;
    }
  }

  // SignOut 
  const signOut = () => {
    // Remove auth token cookie
    Cookies.remove('auth-token', { path: '/' });
    
    // Remove logged status
    localStorage.setItem('logged', 'false');
    navi('/login');
  }

  return (
    <UserContext.Provider value={{ loginUser, signUpUser, signOut }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;