import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Api from '../../api/api';
import mockData from '../../data/data';

import Banner from '../shared/Banner';
import Event from '../shared/Event';
import RouteRestrictor from '../shared/RouteRestrictor';

const api = new Api();

const { getMeetupData } = api;

const propTypes = {
  accessToken: PropTypes.string,
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  selectEvent: PropTypes.func.isRequired,
};

const defaultProps = {
  accessToken: null,
};

class Group extends Component {
  state = {
    events: [],
    group: '',
  }

  componentWillMount() {
    if (process.env.REACT_APP_ENV === 'development') {
      this.loadMockData();
    } else {
      this.loadPage();
    }
  }

  setGroupInfo = (group) => {
    this.setState({ group });
  }

  loadData = (events) => {
    this.setGroupInfo(events[0].group);
    this.setState({ events });
  }

  loadMockData = () => {
    this.setGroupInfo(mockData[0].group);
    this.setState({ events: mockData });
  }

  loadPage = () => {
    const { accessToken, match } = this.props;
    const { groupName } = match.params;
    const authorized = !!accessToken;
    if (authorized && process.env.REACT_APP_ENV !== 'development') {
      getMeetupData(groupName, accessToken, this.loadData);
    }
  }

  selectEvent = (selectedEvent) => {
    const { id, group } = selectedEvent;
    const selectedEventURL = `/group/${group.urlname}/event/${id}`;
    this.props.selectEvent(selectedEvent);
    this.props.history.push(selectedEventURL);
  }

  render() {
    const { group } = this.state;
    const countDownMessage = `Until the next ${group.name} Meetup`;
    const firstEvent = this.state.events[0];
    const startYear = new Date(group.created).getFullYear();

    return (
      <div className="Group page">
        <RouteRestrictor />
        <Banner
          countDownMessage={countDownMessage}
          goBackButton
          goBackRoute="/"
          goBackText="Back to Home Page"
          nextEventTime={firstEvent ? firstEvent.time : null}
          subTitle={`Devvin' it up since ${startYear}`}
          title={this.state.group.name}
        />
        <div className="events">
          {this.state.events.map(event => (
            <Event
              key={event.id}
              event={event}
              selectEvent={this.selectEvent}
            />
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.generalReducer.accessToken,
});

const mapDispatchToProps = dispatch => ({
  selectEvent: (selectedEvent) => {
    const action = { type: 'SELECT_EVENT', selectedEvent };
    dispatch(action);
  },
});

Group.propTypes = propTypes;
Group.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Group);
