import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Api from '../../api/api';
import mockData from '../../data/data';

import Banner from '../shared/Banner';
import Card from '../shared/Card';
import Event from '../shared/Event';
import RouteRestrictor from '../shared/RouteRestrictor';
import SliderCarousel from '../shared/SliderCarousel';

const api = new Api();

const { getMeetupData, getSimilarGroups } = api;

const propTypes = {
  accessToken: PropTypes.string,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
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
    similarGroups: [],
  }

  componentWillMount() {
    const storageToken = sessionStorage.getItem('accessToken');
    if (!this.props.accessToken && storageToken) {
      this.props.setAccessToken(storageToken);
    }
  }

  componentDidMount() {
    this.initialize();
    this.clearStorage();
  }

  componentDidUpdate(prevProps) {
    const prevGroupName = prevProps.match.params.groupName;
    const thisGroupName = this.props.match.params.groupName;
    const prevToken = prevProps.accessToken;
    const thisToken = this.props.accessToken;
    if (prevGroupName !== thisGroupName || prevToken !== thisToken) {
      this.initialize();
    }
  }

  setGroupInfo = (group) => {
    this.setState({ group });
  }

  setSimilarGroups = (similarGroups) => {
    this.setState({ similarGroups });
  }

  clearStorage = () => {
    // remove the group url from storage to allow
    // home page refresh in the future
    sessionStorage.removeItem('groupUrl');
  }

  initialize = () => {
    if (process.env.REACT_APP_ENV === 'development') {
      this.loadMockData();
    } else {
      this.loadPage();
    }
  }

  loadData = (events) => {
    const { group } = events.length > 0 ? events[0] : {};
    if (group) {
      const { urlname } = group;
      this.setGroupInfo(group);
      getSimilarGroups(urlname, this.props.accessToken, this.setSimilarGroups);
    }
    this.setState({ events });
  }

  loadMockData = () => {
    this.setGroupInfo(mockData[0].group);
    this.setState({ events: mockData });
  }

  loadPage = () => {
    const { accessToken, match } = this.props;
    const { groupName } = match.params;
    const authorized = accessToken !== null;
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

  visitGroup = (group) => {
    this.props.history.push(`/group/${group.urlname}`);
    this.setState({ group });
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
        <SliderCarousel title="Similar Groups">
          {this.state.similarGroups.map((g) => {
            const photo = g.key_photo ?
            (
              <div
                className="avatar"
                style={{ backgroundImage: `url(${g.key_photo.thumb_link})` }}
              />
            )
            : null;

            return (
              <Card
                key={g.id}
                handleClick={this.visitGroup}
                returnValue={g}
              >
                <div>
                  <div className="item">
                    {photo}
                  </div>
                  <h6>{g.name}</h6>
                </div>
              </Card>
            );
          })};
        </SliderCarousel>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.generalReducer.accessToken,
});

const mapDispatchToProps = dispatch => ({
  setAccessToken: (accessToken) => {
    const action = { type: 'SET_ACCESS_TOKEN', accessToken };
    dispatch(action);
  },

  selectEvent: (selectedEvent) => {
    const action = { type: 'SELECT_EVENT', selectedEvent };
    dispatch(action);
  },
});

Group.propTypes = propTypes;
Group.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Group);
