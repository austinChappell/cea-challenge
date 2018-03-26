import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.element.isRequired,
};

const Card = props => (
  <div className="Card">
    {props.children}
  </div>
);

Card.propTypes = propTypes;

export default Card;
