import { useState, useEffect } from "react";
import axios from "axios";

function hookPayment() {
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [selectedPackageName, setSelectedPackageName] = useState('');
  const [packages, setPackages] = useState([]);
  
  const getData = async () => {
    try {
      const result = await axios.get("http://localhost:4001/admin/get");
      setPackages(result.data.packages);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  useEffect(() => {
    getData();
   
  }, []);

  return {filteredPackages,setFilteredPackages,selectedPackageName,setSelectedPackageName,packages, setPackages}
}

export default hookPayment