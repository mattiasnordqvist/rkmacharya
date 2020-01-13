var {google} = require('googleapis');

var key = {};
try{
    key = require('./.service-account.json');
}catch(e){
    key.client_email = process.env.CLIENT_EMAIL;
    key.private_key = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');
}
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
    var today = new Date();
    today.setHours(0,0,0,0);
    nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1)
    var response = await api.events.list({calendarId : calendarId, singleEvents: true, timeMin: today.toISOString(), timeMax: nextYear.toISOString(), maxResults: 1000 });
    var events = response.data.items.sort((a,b) => Date.parse(a.start.dateTime) - Date.parse(b.start.dateTime));
    console.log(response.data.items.length);
    createPage({
      path: `/events`,
      component: require.resolve("./src/templates/events.js"),
      context: {events: events},
    })
  }