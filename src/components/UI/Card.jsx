import PropTypes from "prop-types";

export const Card = ({ children, className = "" }) => {
  return <div className={`bg-white rounded-lg ${className}`}>{children}</div>;
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired, // allows single or multiple elements
};
