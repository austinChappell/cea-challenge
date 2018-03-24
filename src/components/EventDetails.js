import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class EventDetails extends Component {
  state = {
    authorized: false,
  }

  componentWillMount() {
    this.loadPage();
    console.log('PROPS', this.props.match)
  }

  loadPage = () => {
    const authorized = this.props.accessToken ? true : false;
    this.setState({ authorized })
  }

  render() {
    const authCheck = this.state.authorized ? null : <Redirect to="/" />

    return (
      <div className="EventDetails">
        {authCheck}
        Event Details Component
      </div>
    )
  }
} 

const mapStateToProps = state => ({
  accessToken: state.generalReducer.userAccessToken,
});

export default connect(mapStateToProps)(EventDetails);
