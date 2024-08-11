import { useState, createContext, useContext } from "react";

const FilterContext = createContext();

function FilterProvider(props) {
  const [filterParams, setFilterParams] = useState({});
  const [ageRange, setAgeRange] = useState([18, 80]);
  return (
    <FilterContext.Provider
      value={{ filterParams, setFilterParams, ageRange, setAgeRange }}
    >
      {props.children}
    </FilterContext.Provider>
  );
}

const useFilter = () => useContext(FilterContext);

export { FilterProvider, useFilter };
