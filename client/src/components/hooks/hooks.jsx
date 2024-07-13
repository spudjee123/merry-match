import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createId = async (userInfo) => {
    const formData = {
      name: userInfo.name,
      birthdate: userInfo.dateOfBirth,
      location: userInfo.location,
      city: userInfo.city,
      username: userInfo.username,
      email: userInfo.email,
      password: userInfo.password,
      sexident: userInfo.sexIden,
      sexprefer: userInfo.sexPrefer,
      racialprefer: userInfo.racePrefer,
      meetprefer: userInfo.meeting,
      images: userInfo.images,
    };
    try {
      setIsError(false);
      setIsLoading(true);
      await axios.post(`http://localhost:4001/register`, formData);
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  return { createId, isError, isLoading };
}

export default useRegister;