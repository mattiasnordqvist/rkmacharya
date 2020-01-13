var {google} = require('googleapis');

var key = {};
try{
    key = require('./.service-account.json');
}catch(e){
    key.client_email = process.env.CLIENT_EMAIL;
    key.private_key = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');
}
const SCOPES = 'https://www.googleapis.com/auth/calendar';
console.log(key);
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
    createPage({
      path: `/events`,
      component: require.resolve("./src/templates/events.js"),
      context: {events: test.data.items},
    })
  }