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
    const packageName = localStorage.getItem('selectedPackageName');
    if (packageName) {
      setSelectedPackageName(packageName);
    }
  }, []);

  useEffect(() => {
    if (selectedPackageName && packages.length > 0) {
      const packageItem = packages.find(pkg => pkg.packages_name === selectedPackageName);
      setFilteredPackages(packageItem ? [packageItem] : []);
    }
  }, [selectedPackageName, packages]);
  return {filteredPackages,setFilteredPackages,selectedPackageName,setSelectedPackageName,packages, setPackages}
}

export default hookPayment