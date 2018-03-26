import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment-timezone';

import Banner from '../shared/Banner';
import MemberCarousel from '../shared/MemberCarousel';
import RouteRestrictor from '../shared/RouteRestrictor';

import Api from '../../api/api';
import mockEventData from '../../data/event_data';

const api = new Api();

const { getMeetupEvent } = api;

const propTypes = {
  accessToken: PropTypes.string,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  selectedEvent: PropTypes.objectOf(PropTypes.any),
};

const defaultProps = {
  accessToken: null,
  selectedEvent: null,
};

class EventDetails extends Component {
  state = {
    rsvps: [],
  }

  componentDidMount() {
    const { accessToken, match } = this.props;
    const { eventId, groupName } = match.params;
    if (process.env.REACT_APP_ENV === 'development') {
      this.setEventData(mockEventData);
    } else {
      getMeetupEvent(groupName, eventId, accessToken, this.setEventData);
    }
  }

  setEventData = (results) => {
    const rsvps = results.map((r => r.member));
    this.setState({ rsvps });
  }

  render() {
    const { selectedEvent } = this.props;
    const { name } = selectedEvent;
    const countDownMessage = `Until the ${name} Meetup`;

    return (
      <div className="EventDetails">
        <RouteRestrictor />
        <Banner
          countDownMessage={countDownMessage}
          nextEventTime={selectedEvent.time}
          subTitle={selectedEvent.name}
        />
        <div>
          <h4>Where:</h4>
          <div>
            <p>
              {selectedEvent.venue ? selectedEvent.venue.name : 'TBD'}
            </p>
          </div>
        </div>
        <div>
          <h4>When:</h4>
          <div>
            <p>
              {moment.tz(selectedEvent.time, 'America/Chicago').format('MMMM Do, YYYY, h:mm a')}
            </p>
          </div>
        </div>
        <div>
          <h4>Details:</h4>
          <div dangerouslySetInnerHTML={{ __html: selectedEvent.description }} />
        </div>
        <MemberCarousel
          members={this.state.rsvps}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.generalReducer.accessToken,
  selectedEvent: state.eventReducer.selectedEvent,
});

EventDetails.propTypes = propTypes;
EventDetails.defaultProps = defaultProps;

export default connect(mapStateToProps)(EventDetails);
