class Api {
  get = (url, cb) => fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json()).then((results) => {
    cb(results);
  }).catch((err) => {
    throw err;
  })

  getMeetupData = (eventName, accessToken, cb) => {
    const url = `https://api.meetup.com/${eventName}/events?&sign=true&photo-host=public&access_token=${accessToken}`;
    this.get(url, cb);
  }

  getMeetupEvent = (groupName, eventId, accessToken, cb) => {
    const url = `https://api.meetup.com/${groupName}/events/${eventId}/rsvps?&sign=true&photo-host=public&access_token=${accessToken}`;
    this.get(url, cb);
  }

  getSimilarEvents = (groupName, accessToken, cb) => {
    const url = `https://api.meetup.com/${groupName}/similar_groups?&sign=true&photo-host=public&access_token=${accessToken}`;
    this.get(url, cb);
  }
}

export default Api;
