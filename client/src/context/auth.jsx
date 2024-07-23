import React, { useState } from "react";
import "dotenv/config";
import { jwtDecode } from "jwt-decode"

const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
  });

  const [userLogin, setUserLogin] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const updateLogin = useCallback((info)=>{
    setUserLogin(info)
  },[])

// register
const [userInfo, setUserInfo] = useState({
  name: "",
  birthdate: "",
  location: "",
  city: "",
  username: "",
  email: "",
  password: "",
  sexident: "",
  sexprefer: "",
  racialprefer: "",
  meetprefer: "",
  images: { 1: "", 2: "", 3: "", 4: "", 5: "" },
});
  const updateRegister = useCallback((info)=>{
    setUserInfo(info)
  },[])
  const logout = () => {
    localStorage.removeItem("token");
    setState({ ...state, user: null })
  };


  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{ userInfo,updateRegister,userLogin,updateLogin,state,  logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};