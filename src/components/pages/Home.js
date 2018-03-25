import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const myMeetups = [
  {
    title: 'React',
    url: 'ReactJS-Dallas',
  },
  {
    title: 'NodeSchool',
    url: 'Nodeschool-Dallas',
  },
];

class Home extends Component {
  componentWillMount() {
    if (!this.props.accessToken) {
      const { hash } = this.props.location;
      if (hash.indexOf('access_token=') > -1) {
        // split the url query string on "access_token="
        const splitHash = hash.split('access_token=');

        // split the other query params off and return only the token
        const accessToken = splitHash[1].split('&')[0];

        // save accessToken to Redux
        this.props.setAccessToken(accessToken);
      }
    }
  }

  storeGroupUrl = (url) => {
    sessionStorage.setItem('groupUrl', url);
  }

  render() {
    const { accessToken } = this.props;
    const meetupAuthUrl = `https://secure.meetup.com/oauth2/authorize?client_id=${process.env.REACT_APP_MEETUP_CONSUMER_KEY}&response_type=token&redirect_uri=${process.env.REACT_APP_MEETUP_REDIRECT_URI}`;
    const groupUrl = sessionStorage.getItem('groupUrl');

    const link = accessToken ?
      <Redirect to={`/group/${groupUrl}`} />
      : <a href={meetupAuthUrl}>Enter ReactJS Dallas</a>;

    return (
      <div className="Home page">
        Home Component
        {link}
        {myMeetups.map((meetup, index) => {
          const meetupLink = accessToken ?
            <Redirect to={'/group/${meetup.url}'} />
            : <a href={meetupAuthUrl} onClick={() => this.storeGroupUrl(meetup.url)}>{meetup.title}</a>;

          return (
            <div key={index}>
              {meetupLink}
            </div>
          );
        })}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
