import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Home extends Component {
  componentWillMount() {
    console.log('PROPS', this.props.match);
  }

  render() {
    const { accessToken } = this.props;
    const meetupAuthUrl = `https://secure.meetup.com/oauth2/authorize?client_id=${process.env.REACT_APP_MEETUP_CONSUMER_KEY}&response_type=token&redirect_uri=${process.env.REACT_APP_MEETUP_REDIRECT_URI}`;

    const link = accessToken ?
      <Redirect to="/event_details" />
      : <a href={meetupAuthUrl}>Enter ReactJS Dallas</a>;

    return (
      <div className="Home">
        Home Component
        {link}
      </div>
    );
  }
}

export default Home;
