import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

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

export default connect(mapStateToProps)(RouteRestrictor);
