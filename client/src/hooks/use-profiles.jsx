import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const useProfiles = () => {
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(0);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [userInfo, setUserInfo] = useState({
    images: [],
    hobbiesList: [],
  });

  const [profilesList, setProfilesList] = useState([]);
  const [profile, setProfile] = useState({});

  const getProfiles = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      console.log("hello");
      const result = await axios.get(`http://localhost:4001/profiles`);
      setProfilesList(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProfileById = async (user_id) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const result = await axios.get(
        `http://localhost:4001/profiles/${user_id}`
      );
      setProfile(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { getProfiles, getProfileById, profilesList, profile };
};

export default useProfiles;
