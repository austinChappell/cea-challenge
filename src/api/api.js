class Api {
  // authorize = (eventName, cb) => {
  //   const url = `https://secure.meetup.com/oauth2/authorize?client_id=${process.env.REACT_APP_MEETUP_CONSUMER_KEY}&response_type=token&redirect_uri=${process.env.REACT_APP_SELF_URI}`;
  //   return fetch(url, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }).then((response) => {
  //     console.log('RESPONSE', response);
  //     return response.json();
  //   }).then((results) => {
  //     console.log('RESULTS', results);
  //     cb(results);
  //   }).catch((err) => {
  //     throw err;
  //   })
  // }

  getMeetupData = (eventName, cb) => {
    const url = `https://api.meetup.com/${eventName}/events`;
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_MEETUP_KEY}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      console.log('RESPONSE', response);
      return response.json();
    }).then((results) => {
      console.log('RESULTS', results);
      cb(results);
    }).catch((err) => {
      throw err;
    })
  }
}

export default Api;