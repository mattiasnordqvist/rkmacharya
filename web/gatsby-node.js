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

var find = function(what, where)
{
    return (where || "")
        .split(/\n|\r|(<br>)/)
        .filter(x => !!x)
        .map(x => x.replace(/&nbsp;/g,'').trim())
        .filter(x => x.startsWith(what+":"))
        .map(x => x.substring(2).trim()).shift();
}

exports.createPages = async ({ actions: { createPage } }) => {

    var calendarsResponse = await sheetsApi.spreadsheets.values.get({spreadsheetId: databaseId, range: 'Calendars!A2:D'});
    var clientsResponse = await sheetsApi.spreadsheets.values.get({spreadsheetId: databaseId, range: 'PublicSchedule!A2:B'});
    var clients = clientsResponse.data.values.map(x => ({name: x[0], publicName: x[1]}));
    var from = new Date();
    from.setHours(0,0,0,0);
    var to = new Date();
    to.setDate(to.getDate()+28);
    var events = [];
    await Promise.all(calendarsResponse.data.values.filter(cdata => cdata[3].toString().toLowerCase().trim() == 'x').map(async cdata => {
        var response = await api.events.list({calendarId : cdata[1], singleEvents: true, timeMin: from.toISOString(), timeMax: to.toISOString(), maxResults: 1000 });
        events = events.concat(response.data.items.map(x => {
            var location = find('L', x.description);
            var isWebinar = (!!location) ? location.replace(/(<a.*?>)|(<\/a>)/g,'').startsWith('http') : false;
            var link = isWebinar ? location.replace(/(<a.*?>)|(<\/a>)/g,'') : `https://maps.google.com/?q=${x.location}`;
            var client = isWebinar ? find('C', x.description) : (clients.find(c => c.name == find('C', x.description)) ? clients.find(c => c.name == find('C', x.description)).publicName : null);
            return {
                teacher: find('S', x.description) || cdata[0],
                start: x.start.dateTime,
                end: x.end.dateTime,
                summary: x.summary,
                link: link,
                location: location,
                substitute: !!find('S', x.description),
                client: client,
                cancelledReason: find('I', x.description),
                cancelled: find('I', x.description) !== undefined || find('I', x.description) == "",
                isWebinar: isWebinar
            };
        }))
        .filter(x => (!!x.client));
    }));
    
    events = events.sort((a,b) => Date.parse(a.start) - Date.parse(b.start));
    createPage({
      path: `/`,
      component: require.resolve("./src/templates/events.js"),
      context: {events: events},
    });
  }

