import { useState } from "react";
import PropTypes from "prop-types";
import { HiChevronUp, HiChevronDown } from "react-icons/hi2";

export const ToggleButton = ({ name, onClick }) => {
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`text-indigo-800 border-2 border-indigo-400 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 flex items-center hover:bg-gray-100 hover:text-slate-800 hover:border-indigo-900 focus:border-transparent focus:ring-2 focus:outline-none focus:ring-indigo-900 focus:text-slate-800 focus:bg-indigo-200`}
    >
      {name}
      {toggle ? (
        <HiChevronUp className="ml-3 text-indigo-600" />
      ) : (
        <HiChevronDown className="ml-3 text-indigo-600" />
      )}
    </button>
  );
};

// -------------------- PropTypes --------------------
ToggleButton.propTypes = {
  name: PropTypes.string.isRequired,       // Button label text
  onClick: PropTypes.func,                 // Optional click handler
};
