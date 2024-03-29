import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import Event from "../components/event"
import SEO from "../components/seo"
import nextArrow from "../images/next.png"


const Popup = ({event, closePopup}) => {

    const handleSubmit = event => {
      event.preventDefault();
      let f = event.target;
      const formData = new FormData(f);
      formData.append('form-name', f.getAttribute('name'));
      fetch('/', 
      {
        method:'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString()
      }).then(res => {if(res){
        alert('Thank you');
        closePopup();
      }});
      
    };

    return (
      <div className='popup'>
        <div className='popup_inner'>
    <h1>{event.summary}</h1>
    <h3>{new Date(event.start).toDateString()} {new Date(event.start).toLocaleString([], {hour: '2-digit', minute:'2-digit'})}</h3>
          <div id="booking">
            <form name="booking" method="POST" onSubmit={handleSubmit} >
              <input type="hidden" name="class" value={event.summary} />
              <input type="hidden" name="date" value={new Date(event.start).getFullYear()+"-"+new Date(event.start).getMonth()+"-"+new Date(event.start).getDate()}/>
              <input type="hidden" name="time" value={new Date(event.start).getHours()+":"+new Date(event.start).getMinutes()}/>
                <p>
                  <label>Name: <input type="text" name="name" required/></label>   
                </p>
                <p>
                  <label>Email: <input type="email" name="email" required/></label>
                </p>
                <p>
                  <label>Payment method: <select name="payment[]" required>
                  <option value="dropin">Drop In</option>
                  <option value="classcard">10 classcard</option>
                  <option value="member">Monthly donator</option>
                  <option value="firstTime">First time trial</option>
                  </select></label>
                </p>
                <p>
                  <label>Message: <textarea name="message"></textarea></label>
                </p>
                <span>
                  <button type="submit">Book</button>
                  </span><span>
                  <button onClick={closePopup}>Cancel</button>
                  </span>
              </form>
          </div>
        </div>
      </div>
    );
 }

const getDayIndex = (day) => (day+6)%7;

var todayIndex = getDayIndex(new Date().getDay());

const isToday = (someDate) => {
  const today = new Date()
  return someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
}

const getDayName = (d) => {
  if(isToday(d)){
    return "Today";
  }
  return dayNames[getDayIndex(d.getDay())];
}

const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// const uniques = function(arr) {
//   var a = []
//   for (var i = 0, l = arr.length; i < l; i++) {
//     if (a.indexOf(arr[i]) === -1 && arr[i] !== "") {
//       a.push(arr[i])
//     }
//   }
//   return a
// }




// const ToggleFilter = ({ toggles, onToggle }) => {
//   return (
//     <div>
//       {Object.keys(toggles).map(k => (
//         <button type="button" key={k} onClick={() => onToggle(k)}>
//           {k} - {toggles[k] ? "yes" : "no"}
//         </button>
//       ))}
//     </div>
//   )
// }


// const createToggles = a =>
//   uniques(a).reduce((x, y) => {
//     x[y] = false
//     return x
//   }, {})
// const toggle = (toggles, k) =>
//   Object.assign(
//     {},
//     toggles,
//     (function(attr, val) {
//       var a = {}
//       a[attr] = val
//       return a
//     })(k, !toggles[k])
//   )
const appendData = events =>
  events.map(x => ({
    ...x,
    date: DatePart(new Date(x.start)),
    day: dayNames[(new Date(x.start).getDay() + 6) % 7],
    clientAndLocation: x.client + " " + x.location,
    highlighted: false,
  }))

const generateDates = (startDate, endDate) => {
  var retVal = [];
  var current = new Date(startDate);
 
  while (current <= endDate) {
    retVal.push(new Date(current));
    var date = new Date(current.valueOf());
    date.setDate(date.getDate() + 1);
    current = date;
  }
 
  return retVal;
}

const DatePart = (d) => new Date(d.setHours(0,0,0,0));

const Events = ({pageContext}) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [offset, setOffset] = useState(0);
  const [events, setEvents] = useState(appendData(pageContext.events))
  const [selectedEvent, setSelectedEvent] = useState({});

    
  // const [teacherToggles, setTeacherToggles] = useState(createToggles(events.map(x => x.teacher)))
  // const [summaryToggles, setSummaryToggles] = useState(createToggles(events.map(x => x.summary)))
  // const [locationToggles, setLocationToggles] = useState(createToggles(events.map(x => x.clientAndLocation)))
  // const [dayToggles, setDayToggles] = useState(createToggles(dayNames))
  const dates = generateDates(DatePart(new Date()), DatePart(new Date(Math.max.apply(null, events.map((e) => e.date)))));

  // const [dateFilter, setDateFilter] = useState({
  //     check: (e) => e.start >= this.dates[this.active],
  //     dayNames: [0,1,2,3,4,5,6].map(x=>days[(x+todayIndex)%7]),
  //     dates: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(x => {
  //       var someDay = new Date();
  //       someDay.setDate(new Date().getDate()+x);
  //       return someDay;
  //     }),
  //     active: 0})
  // var dateFilter = ;

  // toggleFilter = (e, where, what) => {
  //   var filter = { ...this.state.filter }
  //   filter[where][what] = !filter[where][what];
  //   localStorage.setItem('filter', JSON.stringify(filter));
  //   this.setState({ ...this.state, filter });
  //   this.filterEvents();
  // }

  //
  
  // const highlightEvents = events => {
  //   events.forEach(e => {
  //     var anyfilter = false;
  //     e.highlighted = true
  //     if (Object.values(teacherToggles).some(x => x)) {
  //       e.highlighted &= teacherToggles[e.teacher]
  //       anyfilter = true;
  //     }
  //     if (Object.values(summaryToggles).some(x => x)) {
  //       e.highlighted &= summaryToggles[e.summary]
  //       anyfilter = true;
  //     }
  //     if (Object.values(locationToggles).some(x => x)) {
  //       e.highlighted &= locationToggles[e.clientAndLocation]
  //       anyfilter = true;
  //     }
  //     if (Object.values(dayToggles).some(x => x)) {
  //       e.highlighted &= dayToggles[e.day]
  //       anyfilter = true;
  //     }
      
  //     e.highlighted = !e.highlighted;
  //     if(!anyfilter){
  //       e.highlighted = false;
  //     }
  //   })
  //   return events
  // }
  return (
    <Layout>
      <SEO title="Home"></SEO>
      {/* <ToggleFilter toggles={teacherToggles} onToggle={k => setTeacherToggles(toggle(teacherToggles, k))}></ToggleFilter>
      <ToggleFilter toggles={summaryToggles} onToggle={k => setSummaryToggles(toggle(summaryToggles, k))}></ToggleFilter>
      <ToggleFilter toggles={locationToggles} onToggle={k => setLocationToggles(toggle(locationToggles, k))}></ToggleFilter>
      <ToggleFilter toggles={dayToggles} onToggle={k => setDayToggles(toggle(dayToggles, k))}></ToggleFilter> */}
      {popupVisible && 
      <Popup
        text='Close Me'
        closePopup={() => setPopupVisible(false)}
        event={selectedEvent}
      />
      }
      <section className="schedule">
        <div className="schedule-week">
        {offset>0 && <div onClick={() => setOffset(offset-1)} className="day-nav day-nav-prev"><img className="noselect" src={nextArrow}></img></div>}
        {dates.slice(offset,7+offset).map((d) => {
          var eventsOnDate = events.filter(e => { return e.date.getTime() == d.getTime();})
          return (
          <div className="schedule-column" key={d.toString()}>
            <div className="schedule-date">
              <span className="date-box">{d.getDate()} {monthNames[d.getMonth()]}</span>
              <span className="day-box">{getDayName(d)}</span>
            </div>
            <div className="schedule-classes">
              {eventsOnDate.length==0 && <div className="schedule-classes-empty">No classes</div>}
              {
              eventsOnDate.map(e => (
                <Event key={e.location + e.start.toString()} event={e} select={() => {setSelectedEvent(e); setPopupVisible(true);}}></Event>
              ))
            }
            </div>
        </div>)})
        }
        {offset+7 < dates.length &&<div onClick={() => setOffset(offset+1)} className="day-nav day-nav-next"><img className="noselect" src={nextArrow}></img></div>}
        </div>
      </section>
    </Layout>
  )
}

export default Events
