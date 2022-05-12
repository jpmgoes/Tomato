import React from "react";

const Toggle = ({ cb }) => {
  return (
    <div className="darkmode-tongle">
      <div class="toggle-container">
        <input type="checkbox" id="switch" onClick={cb} />
        <label for="switch"></label>
      </div>
    </div>
  );
};

export default Toggle;
