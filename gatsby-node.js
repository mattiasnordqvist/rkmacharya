var {google} = require('googleapis');

var key = {};
try{
    key = require('./.service-account.json');
}catch(e){
    key.client_email = process.env.CLIENT_EMAIL;
    key.private_key = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');
}
var auth = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/spreadsheets'],
    '785650218980-ghj362fpfb26mpiiblj9bvmpeimd30qh@developer.gserviceaccount.com'
);

const sheetsApi = google.sheets({version: "v4", auth: auth});
const databaseId = '1h4eN34FuxY7ld9L83RjBzPfa7iLX0NsX8Q96aDdHWBI';

const api = google.calendar({version : "v3", auth: auth});
const calendarId = 'lvvofmbvneim36p293m8e00qbk@group.calendar.google.com';



exports.createPages = async ({ actions: { createPage } }) => {

    var calendarsResponse = await sheetsApi.spreadsheets.values.get({spreadsheetId: databaseId, range: 'Calendars!A2:B'});

    var from = new Date();
    from.setHours(0,0,0,0);
    var to = new Date();
    to.setDate(to.getDate()+14);
    var events = [];
    await Promise.all(calendarsResponse.data.values.map(async cdata => {
        var response = await api.events.list({calendarId : cdata[1], singleEvents: true, timeMin: from.toISOString(), timeMax: to.toISOString(), maxResults: 1000 });
        events = events.concat(response.data.items);
    }));
    events = events.sort((a,b) => Date.parse(a.start.dateTime) - Date.parse(b.start.dateTime));
    createPage({
      path: `/events`,
      component: require.resolve("./src/templates/events.js"),
      context: {events: events},
    });
  }