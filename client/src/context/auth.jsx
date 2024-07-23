import { useState, createContext, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

function AuthProvider(props) {
  //get data from token on local storage
  const getDataFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return token;
    }
    const userDataFromToken = jwtDecode(token);
    return userDataFromToken;
  };

  // create state
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: getDataFromToken,
  });

  const navigate = useNavigate();

  // make a login request
  const login = async (data) => {
    try {
      setState({ ...state, error: null, loading: true });
      console.log(data);
      const result = await axios.post("http://localhost:4001/auth/login", data);
      console.log(result);
      const token = result.data.token;
      console.log(token);
      localStorage.setItem("token", token);
      const user = jwtDecode(token);
      setState({ ...state, user });
      alert("Login successfully!");
      console.log(user);
      if (user.role === "admin") {
        navigate("/package/view");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        error: error.response.data.message,
        loading: false,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setState({ ...state, user: null });
    navigate("/");
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider value={{ state, login, logout, isAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  );
}

// this is a hook that consume AuthContext
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
