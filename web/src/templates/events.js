import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import nextArrow from "../images/next.png"
var classNames = require("classnames")
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

const formatTime = dateTime =>
  new Date(dateTime).toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })

function Event({ event, time }) {
  var diffMs = new Date(event.end) - new Date(event.start);
  var diffMins = Math.round(diffMs / 60000);
  return (
    <div className={classNames({ cancelled: event.cancelled, event: true, dehighlighted: new Date(event.start) < time })}>
      <div className="class-time">
        <span className="class-time-start">{formatTime(event.start)}</span>
        <span className="class-time-duration"> {diffMins} min</span>
      </div>
      <div className="class-summary">
        <span className="class-summary-text">{event.summary}</span>
        <span className="class-summary-teacher">{event.teacher}</span>
      </div>
      <div className="class-location">
          {<a href={event.link} target="_blank" className={classNames({web: event.isWebinar})}> 
          {event.client} {event.isWebinar ? "(online)" : event.location}</a>}
          <div>
            {event.book && <a href={event.book} target="_blank">Book</a>}
          </div>
          <div>
            {event.pay && <a href={event.pay} target="_blank">Pay</a>}
          </div>
          <div>
            {event.donate && <a href={event.donate} target="_blank">Donate</a>}
          </div>
          {event.note && <div>{event.note}</div>}
      </div>
    </div>
  )
}

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

const Events = props => {

  const [time, setTime] = useState(new Date());
  const [offset, setOffset] = useState(0);
  const [events, setEvents] = useState(appendData(props.pageContext.events))

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 100000);
    return () => clearInterval(interval);
  }, []);

  
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

  // componentDidMount() {
  //   if(localStorage.getItem("filter"))
  //   {
  //     var newFilter = this.state.filter;
  //     var oldFilter = JSON.parse(localStorage.getItem("filter"));
  //     Object.keys(newFilter).forEach(x =>
  //     {
  //       Object.keys(newFilter[x]).forEach(y => {
  //         if(oldFilter.hasOwnProperty(x) && newFilter[x].hasOwnProperty(y)){
  //           newFilter[x][y] = oldFilter[x][y];
  //         }
  //       })
  //     });
  //     localStorage.setItem("filter", JSON.stringify(newFilter));
  //     this.setState({filter:newFilter});
  //   }
  //   this.filterEvents();
  // }

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
      <section className="schedule">
        <div className="schedule-week">
        {offset>0 && <div onClick={() => setOffset(offset-1)} className="day-nav day-nav-prev"><img className="noselect" src={nextArrow}></img></div>}
        {dates.slice(offset,7+offset).map((d) => {
          var eventsOnDate = events.filter(e => e.date.getTime() == d.getTime())
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
                <Event key={e.location + e.start} event={e} time={time}></Event>
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
