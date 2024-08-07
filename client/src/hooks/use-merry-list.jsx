import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const useMerryList = () => {
  const navigate = useNavigate();

  const [merryList, setMerryList] = useState([]);
  const [profile, setProfile] = useState({});

  const getMerryList = async (user_id) => {
    try {
      setIsError(false);
      setIsLoading(true);
      console.log("hello");
      const result = await axios.get(
        `http://localhost:4001/merry-list/${user_id}`
      );
      setMerryList(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { getMerryList, merryList };
};

export default useMerryList;
