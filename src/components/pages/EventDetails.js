import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment-timezone';

import actions from '../../store/actions';
import Api from '../../api/api';
import mockEventData from '../../data/event_data';

import Banner from '../shared/Banner';
import Card from '../shared/Card';
import RouteRestrictor from '../shared/RouteRestrictor';
import SliderCarousel from '../shared/SliderCarousel';

const api = new Api();

const { getMeetupEvent } = api;

const propTypes = {
  accessToken: PropTypes.string,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  selectedEvent: PropTypes.objectOf(PropTypes.any),
  setAccessToken: PropTypes.func.isRequired,
};

const defaultProps = {
  accessToken: null,
  selectedEvent: null,
};

class EventDetails extends Component {
  state = {
    rsvps: [],
  }

  componentWillMount() {
    const storageToken = sessionStorage.getItem('accessToken');
    if (!this.props.accessToken && storageToken) {
      this.props.setAccessToken(storageToken);
    }
  }

  componentDidMount() {
    const { accessToken, match } = this.props;
    const { eventId, groupName } = match.params;
    if (process.env.REACT_APP_ENV === 'development') {
      this.setEventData(mockEventData);
    } else {
      getMeetupEvent(groupName, eventId, accessToken, this.setEventData);
    }
    window.scroll(0, 0);
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
        <div className="details">
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
          <SliderCarousel title="RSVP">
            {this.state.rsvps.map(member => (
              <Card key={member.id}>
                <div>
                  <div className="item">
                    <div
                      className="avatar"
                      style={{ backgroundImage: `url(${member.photo.thumb_link})` }}
                    />
                  </div>
                  <h6>{member.name}</h6>
                </div>
              </Card>
            ))}
          </SliderCarousel>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.generalReducer.accessToken,
  selectedEvent: state.eventReducer.selectedEvent,
});

const mapDispatchToProps = dispatch => ({
  setAccessToken: (accessToken) => {
    dispatch(actions.setAccessToken(accessToken));
  },
});

EventDetails.propTypes = propTypes;
EventDetails.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
