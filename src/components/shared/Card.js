import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.element.isRequired,
  handleClick: PropTypes.func,
  returnValue: PropTypes.number,
};

const defaultProps = {
  handleClick: null,
  returnValue: null,
};

const Card = props => (
  <div
    className="Card"
    onClick={() => props.handleClick(props.returnValue)}
  >
    {props.children}
  </div>
);

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
