import React, { Component } from 'react';
import { connect } from 'react-redux';

import RouteRestrictor from '../shared/RouteRestrictor';

import Api from '../../api/api';

const api = new Api();

const { getMeetupEvent } = api;

class EventDetails extends Component {
  state = {}

  componentDidMount() {
    const { accessToken, match } = this.props;
    const { eventId, groupName } = match.params;
    getMeetupEvent(groupName, eventId, accessToken, this.setEventData)
  }

  setEventData = (results) => {
    console.log('EVENT DATA RESULTS', results)
  }

  render() {
    return (
      <div className="EventDetails">
        <RouteRestrictor />
        Event Details
      </div>
    );
  }
};

const mapStateToProps = state => ({
  accessToken: state.generalReducer.accessToken,
});

export default connect(mapStateToProps)(EventDetails);
