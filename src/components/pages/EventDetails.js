import React from 'react';
import { connect } from 'react-redux';

import RouteRestrictor from '../shared/RouteRestrictor';

const EventDetails = (props) => {
  const { event, match } = props;
  const { id } = match.params;
  console.log('MATCH', id);
  return (
    <div className="EventDetails">
      <RouteRestrictor />
      Event Details
    </div>
  );
};

const mapStateToProps = state => ({
  accessToken: state.generalReducer.accessToken,
});

export default connect(mapStateToProps)(EventDetails);
