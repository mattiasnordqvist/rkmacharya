var {google} = require('googleapis');

var key = process.env.service_account || require('./.service-account.json');
const SCOPES = 'https://www.googleapis.com/auth/calendar';

var auth = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    SCOPES,
    '785650218980-ghj362fpfb26mpiiblj9bvmpeimd30qh@developer.gserviceaccount.com'
);

const api = google.calendar({version : "v3", auth : auth});
const calendarId = 'lvvofmbvneim36p293m8e00qbk@group.calendar.google.com';



exports.createPages = async ({ actions: { createPage } }) => {

    var test = await api.events.list({calendarId : calendarId});
    console.log(test.data.items);
    createPage({
      path: `/events`,
      component: require.resolve("./src/templates/events.js"),
      context: {events: test.data.items},
    })
  }