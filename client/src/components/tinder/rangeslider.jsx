import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}`;
}

export default function RangeSlider() {
  const [value, setValue] = React.useState([18, 80]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMinAgeChange = (event) => {
    const newValue = Number(event.target.value);
    setValue([newValue, value[1]]);
  };

  const handleMaxAgeChange = (event) => {
    const newValue = Number(event.target.value);
    setValue([value[0], newValue]);
  };

  const handleMinAgeBlur = () => {
    let minAge = value[0];
    let maxAge = value[1];
    if (minAge < 18) {
      minAge = 18;
    }
    if (minAge > maxAge) {
      minAge = maxAge;
    }
    setValue([minAge, maxAge]);
  };

  const handleMaxAgeBlur = () => {
    let minAge = value[0];
    let maxAge = value[1];
    if (maxAge > 80) {
      maxAge = 80;
    }
    if (maxAge < minAge) {
      maxAge = minAge;
    }
    setValue([minAge, maxAge]);
  };

  return (
    <Box sx={{ width: "90%" }}>
      <Slider
        getAriaLabel={() => "Age Range"}
        value={value}
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
          value={value[0]}
          onChange={handleMinAgeChange}
          onBlur={handleMinAgeBlur}
          className="px-3 py-2 border bg-white border-gray-200 rounded-lg text-xl w-28 h-15 text-start"
        />
        <p className="text-black">-</p>
        <input
          type="text"
          value={value[1]}
          onChange={handleMaxAgeChange}
          onBlur={handleMaxAgeBlur}
          className="px-3 py-2 border bg-white border-gray-200 rounded-lg text-xl w-28 h-15 text-start"
        />
      </div>
    </Box>
  );
}
