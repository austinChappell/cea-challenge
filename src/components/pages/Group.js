import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import moment from 'moment';

import Api from '../../api/api';
import mockData from '../../data/data';

import Banner from '../shared/Banner';
import Event from '../shared/Event';

const api = new Api();

const { getMeetupData } = api;

class Group extends Component {
  state = {
    authorized: false,
    events: [],
    group: '',
  }

  componentWillMount() {
    if (process.env.NODE_ENV === 'development') {
      this.loadMockData()
    } else {
      this.loadPage();
    }
  }

  loadData = (events) => {
    this.setGroupInfo(events[0].group)
    this.setState({ events })
  }

  loadMockData = () => {
    this.setGroupInfo(mockData[0].group)
    this.setState({ authorized: true, events: mockData })
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
    console.log('GROUP COMPONENT STATE', this.state)
    const authCheck = this.state.authorized ? null : <Redirect to="/" />

    return (
      <div className="Group page">
        {authCheck}
        <Banner group={this.state.group} nextEventTime={this.state.events[0].time} />
        <div className="events">
          {this.state.events.map((event, index) => {
            return (
              <Event key={index} event={event} />
            )
          })}
        </div>
      </div>
    )
  }
} 

const mapStateToProps = state => ({
  accessToken: state.generalReducer.accessToken,
});

export default connect(mapStateToProps)(Group);
