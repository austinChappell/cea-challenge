import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Api from '../api/api';
import mockData from '../data/data';

import Banner from './shared/Banner';

const api = new Api();

const { getMeetupData } = api;

class EventDetails extends Component {
  state = {
    authorized: false,
    group: '',
  }

  componentWillMount() {
    if (process.env.NODE_ENV === 'development') {
      this.loadMockData()
    } else {
      this.loadPage();
    }
  }

  loadData = (data) => {
    this.setGroupInfo(data[0].group)
    this.setState({ data })
  }

  loadMockData = () => {
    this.setGroupInfo(mockData[0].group)
    this.setState({ authorized: true, data: mockData })
  }

  loadPage = () => {
    const { accessToken } = this.props;
    const authorized = accessToken ? true : false;
    if (authorized && process.env.NODE_ENV !== 'development') {
      getMeetupData('reactjs-dallas', accessToken, this.loadData)
    }
    this.setState({ authorized })
  }

  setGroupInfo = (group) => {
    console.log('GROUP', group)
    this.setState({ group })
  }

  render() {
    console.log(mockData)
    const authCheck = this.state.authorized ? null : <Redirect to="/" />

    return (
      <div className="EventDetails page">
        {authCheck}
        <Banner group={this.state.group} />
      </div>
    )
  }
} 

const mapStateToProps = state => ({
  accessToken: state.generalReducer.accessToken,
});

export default connect(mapStateToProps)(EventDetails);
