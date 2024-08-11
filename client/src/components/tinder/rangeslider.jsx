import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useFilter } from "../../context/profile-filter-context";

function valuetext(value) {
  return `${value}`;
}

export default function RangeSlider() {
  const { ageRange, setAgeRange } = useFilter();

  const handleChange = (event, newValue) => {
    setAgeRange(newValue);
  };

  const handleMinAgeChange = (event) => {
    const newValue = Number(event.target.value);
    setAgeRange([newValue, ageRange[1]]);
  };

  const handleMaxAgeChange = (event) => {
    const newValue = Number(event.target.value);
    setAgeRange([ageRange[0], newValue]);
  };

  const handleMinAgeBlur = () => {
    let minAge = ageRange[0];
    let maxAge = ageRange[1];
    if (minAge < 18) {
      minAge = 18;
    }
    if (minAge > maxAge) {
      minAge = maxAge;
    }
    setAgeRange([minAge, maxAge]);
  };

  const handleMaxAgeBlur = () => {
    let minAge = ageRange[0];
    let maxAge = ageRange[1];
    if (maxAge > 80) {
      maxAge = 80;
    }
    if (maxAge < minAge) {
      maxAge = minAge;
    }
    setAgeRange([minAge, maxAge]);
  };

  return (
    <Box sx={{ width: "90%" }}>
      <Slider
        getAriaLabel={() => "Age Range"}
        value={ageRange}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        color="secondary"
        min={18}
        max={80}
      />
      <div className="flex justify-between items-center py-5">
        <input
          type="text"
          value={ageRange[0]}
          onChange={handleMinAgeChange}
          onBlur={handleMinAgeBlur}
          className="px-3 py-2 border bg-white border-gray-200 rounded-lg text-xl w-28 h-15 text-start"
        />
        <p className="text-black">-</p>
        <input
          type="text"
          value={ageRange[1]}
          onChange={handleMaxAgeChange}
          onBlur={handleMaxAgeBlur}
          className="px-3 py-2 border bg-white border-gray-200 rounded-lg text-xl w-28 h-15 text-start"
        />
      </div>
    </Box>
  );
}
