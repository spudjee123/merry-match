import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useMerryList = () => {
  const navigate = useNavigate();

  const [merryList, setMerryList] = useState([]);
  const [otherCount, setOtherCount] = useState({});

  const getMerryList = async (user_id) => {
    try {
      const result = await axios.get(
        `http://localhost:4001/merry-list/${user_id}`
      );
      setMerryList(result.data.data);
      setOtherCount(result.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMerryList = async (user_id, friend_id) => {
    try {
      const result = await axios.delete(`http://localhost:4001/merry-list/`, {
        data: {
          user_id: user_id,
          friend_id: friend_id,
        },
      });
      console.log("delete room", result.data.room_id);
    } catch (error) {
      console.log(error);
    }
  };

  return { getMerryList, deleteMerryList, merryList, otherCount };
};

export default useMerryList;
