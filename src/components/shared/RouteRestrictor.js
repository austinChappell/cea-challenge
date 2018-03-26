import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const propTypes = {
  accessToken: PropTypes.string,
};

const defaultProps = {
  accessToken: null,
};

const RouteRestrictor = (props) => {
  const { accessToken } = props;
  const development = process.env.REACT_APP_ENV === 'development';
  const authorized = accessToken !== null || development;
  const content = authorized ? null : <Redirect to="/" />;
  return content;
};

const mapStateToProps = state => ({
  accessToken: state.generalReducer.accessToken,
});

RouteRestrictor.propTypes = propTypes;
RouteRestrictor.defaultProps = defaultProps;

export default connect(mapStateToProps)(RouteRestrictor);
