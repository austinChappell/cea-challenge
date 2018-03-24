import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Api from '../api/api';

const api = new Api();

const { getMeetupData } = api;

class EventDetails extends Component {
  state = {
    authorized: false,
  }

  componentWillMount() {
    this.loadPage();
  }

  loadData = (data) => {
    console.log('DATA', data)
  }

  loadPage = () => {
    const { accessToken } = this.props;
    console.log('ACCESS TOKEN', accessToken)
    const authorized = accessToken ? true : false;
    if (authorized) {
      getMeetupData('reactjs-dallas', accessToken, this.loadData)
    }
    this.setState({ authorized })
  }

  render() {
    const authCheck = this.state.authorized ? null : <Redirect to="/" />

    return (
      <div className="EventDetails">
        {authCheck}
        Event Details Component
      </div>
    )
  }
} 

const mapStateToProps = state => ({
  accessToken: state.generalReducer.accessToken,
});

export default connect(mapStateToProps)(EventDetails);
