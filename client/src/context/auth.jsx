import { useState, createContext, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

function AuthProvider (props) {
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
    user: getDataFromToken(),
  });

  // const [userLogin, setUserLogin] = useState({
  //   usernameOrEmail: "",
  //   password: "",
  // });

  const updateLogin = useCallback((info) => {
    setUserLogin(info);
  }, []);

  // register
  // const [userInfo, setUserInfo] = useState({
  //   name: "",
  //   birthdate: "",
  //   location: "",
  //   city: "",
  //   username: "",
  //   email: "",
  //   password: "",
  //   sexident: "",
  //   sexprefer: "",
  //   racialprefer: "",
  //   meetprefer: "",
  //   images: { 1: "", 2: "", 3: "", 4: "", 5: "" },
  // });
  const updateRegister = useCallback((info) => {
    setUserInfo(info);
  }, []);
  const logout = () => {
    localStorage.removeItem("token");
    setState({ ...state, user: null });
    navigate("/");
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        isAuthenticated,
        // userInfo,
        updateRegister,
        // userLogin,
        updateLogin,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// this is a hook that consume AuthContext
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
