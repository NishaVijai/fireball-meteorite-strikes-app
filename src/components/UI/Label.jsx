import PropTypes from "prop-types";

export const Label = ({ text, ...attrs }) => {
  return <label htmlFor="name" {...attrs}>{text}</label>;
};

Label.propTypes = {
  text: PropTypes.string
};