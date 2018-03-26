import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
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
  state = {
    redirect: false,
  }

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
        this.setRedirect();
      }
    }
  }

  componentWillUpdate(nextProps) {
    if (this.props.accessToken !== nextProps.accessToken) {
      this.setRedirect();
    }
  }

  setRedirect = () => {
    this.setState({ redirect: true });
  }

  storeGroupUrl = (url) => {
    sessionStorage.setItem('groupUrl', url);
  }

  render() {
    const { accessToken } = this.props;
    const meetupAuthUrl = `https://secure.meetup.com/oauth2/authorize?client_id=${process.env.REACT_APP_MEETUP_CONSUMER_KEY}&response_type=token&redirect_uri=${process.env.REACT_APP_MEETUP_REDIRECT_URI}`;
    const groupUrl = sessionStorage.getItem('groupUrl');

    return (
      <div className="Home page">
        <div className="overlay">
          <h1>Austin's Favorite Meetups</h1>
          <div className="meetups">
            {myMeetups.map((meetup, index) => {
              // if there is no token, clicking a link will prompt
              // user to sign in to meetup.com
              const redirectLink = accessToken ?
                <Link to={`/group/${meetup.url}`}>{meetup.title}</Link>
                :
                <a href={meetupAuthUrl} onClick={() => this.storeGroupUrl(meetup.url)}>{meetup.title}</a>;

              // if redirect is true, then redirecto the the group
              // found in session storage
              // redirect is true if access token is in url
              const meetupLink = this.state.redirect ?
                <Redirect to={`/group/${sessionStorage.groupUrl}`} />
                : redirectLink;

              return (
                <div className="meetup" key={index}>
                  {meetupLink}
                </div>
              );
            })}
          </div>
        </div>
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
