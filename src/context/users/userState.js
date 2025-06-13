import { useNavigate } from "react-router-dom";
import UserContext from "./createContext";
import Cookies from 'js-cookie';
import axios from "axios";

const UserState = (props) => {
  const navi = useNavigate();

  // Login User and get auth token
  const loginUser = async (credentials) => {
    try {
      const response = await axios.post('/api/auth/login', credentials, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      if (response.data.success) {
        // Set auth token in cookie with expiration (7 days)
        Cookies.set('auth-token', response.data.token, {
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
        throw new Error(response.data.error || 'Incorrect credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Login failed. Please try again.';
      alert(errorMessage);
      return false;
    }
  }

  // Create User
  const signUpUser = async (credentials) => {
    try {
      const response = await axios.post('/api/auth/createuser', credentials, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      if (response.data.success) {
        // Set auth token in cookie
        Cookies.set('auth-token', response.data.token, {
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
        throw new Error(response.data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Registration failed. Please try again.';
      alert(errorMessage);
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