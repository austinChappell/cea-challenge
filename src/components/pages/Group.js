import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Api from '../../api/api';
import mockData from '../../data/data';

import Banner from '../shared/Banner';
import Event from '../shared/Event';
import RouteRestrictor from '../shared/RouteRestrictor';

const api = new Api();

const { getMeetupData } = api;

class Group extends Component {
  state = {
    authorized: false,
    events: [],
    group: '',
  }

  componentWillMount() {
    if (process.env.REACT_APP_ENV === 'development') {
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
    if (authorized && process.env.REACT_APP_ENV !== 'development') {
      getMeetupData('reactjs-dallas', accessToken, this.loadData)
    }
    this.setState({ authorized })
  }

  setGroupInfo = (group) => {
    this.setState({ group })
  }

  selectEvent = (selectedEvent) => {
    const { id, group } = selectedEvent;
    const selectedEventURL = `/group/${group.urlname}/event/${id}`;
    this.props.selectEvent(selectedEvent);
    this.props.history.push(selectedEventURL)
  }

  render() {
    console.log('GROUP COMPONENT STATE', this.state)
    const { group } = this.state;
    const countDownMessage = `Until the next ${group.name} Meetup`;
    const firstEvent = this.state.events[0];
    const startYear = new Date(group.created).getFullYear();

    return (
      <div className="Group page">
        <RouteRestrictor />
        <Banner
          countDownMessage={countDownMessage}
          nextEventTime={firstEvent ? firstEvent.time : null}
          subTitle={`Devvin' it up since ${startYear}`}
          title={this.state.group.name}
        />
        <div className="events">
          {this.state.events.map((event, index) => {
            return (
              <Event
                key={index}
                event={event}
                selectEvent={this.selectEvent}
              />
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

const mapDispatchToProps = dispatch => ({
  selectEvent: (selectedEvent) => {
    const action = { type: 'SELECT_EVENT', selectedEvent };
    dispatch(action);
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Group);
