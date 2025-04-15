import React from "react";

const SelectSubplace = () => {
  return (
    <>
      <div>
        <label htmlFor="subplace" className="form-label text-white">
          Select Subplace
        </label>
        <select
          className="form-select"
          aria-label="Default select example"
          id="subplace"
        >
          <option>Select Subplace</option>
          <option value="s/Test 3">s/Test 3</option>
          <option value="s/subplace 1">s/subplace 1</option>
          <option value="s/subplace 12">s/subplace 12</option>
          <option value="s/subplace 13">s/subplace 13</option>
        </select>
      </div>
    </>
  );
};

export default SelectSubplace;
