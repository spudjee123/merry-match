import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useUsers = () => {
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(0);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [userInfo, setUserInfo] = useState({ images: [], hobbiesList: [] });

  const getUser = async (user_id) => {
    try {
      setIsError(false);
      setIsLoading(true);
      console.log("hello");
      const result = await axios.get(`http://localhost:4001/users/${user_id}`);
      console.log(result.data.data);
      setUserInfo({ ...userInfo, ...result.data.data });
    } catch (error) {
      console.log(error);
    }
  };

  return { userInfo, setUserInfo, getUser };
};

export default useUsers;
