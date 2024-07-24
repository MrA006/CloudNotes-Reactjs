
import { useNavigate } from "react-router-dom";
import UserContext from "./createContext";


const UserState = (props) => {

    const navi = useNavigate();

//login User and get auth token
  const loginUser = async (credentials) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: myHeaders,
      body:JSON.stringify(credentials)
    });
    const res = await response.json();
    if(res.success){

      localStorage.setItem('auth-token', res.token);
      navi('/');
    }else{
      alert('incorrect credentials');
    }
  }

//Create User
const signUpUser = async (credentials) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    console.log(JSON.stringify(credentials));
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: myHeaders,
      body:JSON.stringify(credentials)
    });

    const authToken = await response.json();
    if(authToken.success){

      localStorage.setItem('auth-token', authToken.token);
      navi('/login');
    }else{
      alert('incorrect credentials');
    }
    
  }

  return (
    <UserContext.Provider value={{ loginUser, signUpUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;