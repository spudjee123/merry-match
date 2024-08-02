import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const useUsers = () => {
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(0);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [userInfo, setUserInfo] = useState({
    images: [],
    hobbiesList: [],
  });

  const { logout } = useAuth();

  const restEmpty = (imageCount) => {
    const result = [];
    for (let i = 0; i < 5 - imageCount; i += 1) {
      result.push("");
    }
    return result;
  };

  const getUser = async (user_id) => {
    try {
      setIsError(false);
      setIsLoading(true);
      console.log("hello");
      const result = await axios.get(`http://localhost:4001/users/${user_id}`);
      console.log(result);
      setUserInfo({
        ...result.data.data,
        images: [
          ...result.data.data.images,
          ...restEmpty(result.data.data.images.length),
        ],
      });
      console.log({
        ...result.data.data,
        images: [
          ...result.data.data.images,
          ...restEmpty(result.data.data.images.length),
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const putUser = async (user_id, data) => {
    try {
      setIsError(false);
      setIsLoading(true);
      await axios.put(`http://localhost:4001/users/${user_id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (user_id) => {
    await axios.delete(`http://localhost:4001/users/${user_id}`);
    logout();
  };

  return { userInfo, setUserInfo, getUser, putUser, deleteUser };
};

export default useUsers;
