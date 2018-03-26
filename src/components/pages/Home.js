import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import actions from '../../store/actions';

const myMeetups = [
  {
    title: 'React',
    url: 'ReactJS-Dallas',
  },
  {
    title: 'NodeSchool',
    url: 'Nodeschool-Dallas',
  },
  {
    title: 'Match',
    url: 'Match-technology-presents',
  },
  {
    title: 'Hiking w/ Geeks',
    url: 'Hiking-with-Geeks-Dallas',
  },
];

const propTypes = {
  accessToken: PropTypes.string,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  setAccessToken: PropTypes.func.isRequired,
};

const defaultProps = {
  accessToken: null,
};

class Home extends Component {
  state = {
    redirect: false,
  }

  componentWillMount() {
    if (!this.props.accessToken) {
      const storageToken = sessionStorage.getItem('accessToken');
      if (storageToken) {
        this.props.setAccessToken(storageToken);
      } else {
        const { hash } = this.props.location;
        if (hash.indexOf('access_token=') > -1) {
          // split the url query string on "access_token="
          const splitHash = hash.split('access_token=');

          // split the other query params off and return only the token
          const accessToken = splitHash[1].split('&')[0];

          // save accessToken to Redux
          this.props.setAccessToken(accessToken);
          sessionStorage.setItem('accessToken', accessToken);
          this.setRedirect();
        }
      }
    }
    window.scroll(0, 0);
  }

  componentWillUpdate(nextProps) {
    if (this.props.accessToken !== nextProps.accessToken) {
      if (sessionStorage.getItem('groupUrl')) {
        this.setRedirect();
      }
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

    return (
      <div className="Home page">
        <div className="overlay">
          <h1>Austin&apos;s Favorite Meetups</h1>
          <div className="meetups">
            {myMeetups.map((meetup) => {
              // if there is no token, clicking a link will prompt
              // user to sign in to meetup.com
              const redirectLink = accessToken ?
                (
                  <Link
                    href={`/group/${meetup.url}`}
                    to={`/group/${meetup.url}`}
                  >
                    {meetup.title}
                  </Link>
                )
                :
                (
                  <a
                    href={meetupAuthUrl}
                    onClick={() => this.storeGroupUrl(meetup.url)}
                  >
                    {meetup.title}
                  </a>
                );

              // if redirect is true, then redirecto the the group
              // found in session storage
              // redirect is true if access token is in url
              const meetupLink = this.state.redirect ?
                <Redirect to={`/group/${sessionStorage.groupUrl}`} />
                : redirectLink;

              return (
                <div className="meetup" key={meetup.url}>
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
    dispatch(actions.setAccessToken(accessToken));
  },
});

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
