import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useMerryList = () => {
  const navigate = useNavigate();

  const [merryList, setMerryList] = useState([]);
  const [otherCount, setOtherCount] = useState({});

  const getMerryList = async (user_id) => {
    try {
      console.log("hello");
      const result = await axios.get(
        `http://localhost:4001/merry-list/${user_id}`
      );
      console.log(result);
      setMerryList(result.data.data);
      setOtherCount(result.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  return { getMerryList, merryList, otherCount };
};

export default useMerryList;
