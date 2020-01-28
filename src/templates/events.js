import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

var classNames = require("classnames")
const getDayIndex = (day) => (day+6)%7;

var todayIndex = getDayIndex(new Date().getDay());


const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

const uniques = function(arr) {
  var a = []
  for (var i = 0, l = arr.length; i < l; i++) {
    if (a.indexOf(arr[i]) === -1 && arr[i] !== "") {
      a.push(arr[i])
    }
  }
  return a
}

const formatTime = dateTime =>
  new Date(dateTime).toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })

function Event({ event }) {
  return (
    <div className={classNames({ event: true, highlighted: event.highlighted })}>
      <h3>
        {event.summary} -{" "}
        <a href={`https://maps.google.com/?q=${event.address}`}>
          {event.client} {event.location}
        </a>
      </h3>
      {event.cancelled && <h4>Cancelled :(</h4>}
      <h4>{event.teacher}</h4>
      {event.day} {formatTime(event.start)} - {formatTime(event.end)}
    </div>
  )
}

const ToggleFilter = ({ toggles, onToggle }) => {
  return (
    <div>
      {Object.keys(toggles).map(k => (
        <button type="button" key={k} onClick={() => onToggle(k)}>
          {k} - {toggles[k] ? "yes" : "no"}
        </button>
      ))}
    </div>
  )
}


const createToggles = a =>
  uniques(a).reduce((x, y) => {
    x[y] = false
    return x
  }, {})
const toggle = (toggles, k) =>
  Object.assign(
    {},
    toggles,
    (function(attr, val) {
      var a = {}
      a[attr] = val
      return a
    })(k, !toggles[k])
  )
const appendData = events =>
  events.map(x => ({
    ...x,
    date: DatePart(new Date(x.start)),
    day: days[(new Date(x.start).getDay() + 6) % 7],
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
  const [events, setEvents] = useState(appendData(props.pageContext.events))
  const [teacherToggles, setTeacherToggles] = useState(createToggles(events.map(x => x.teacher)))
  const [summaryToggles, setSummaryToggles] = useState(createToggles(events.map(x => x.summary)))
  const [locationToggles, setLocationToggles] = useState(createToggles(events.map(x => x.clientAndLocation)))
  const [dayToggles, setDayToggles] = useState(createToggles(days))
  const dates = generateDates(DatePart(new Date()), DatePart(new Date(Math.max.apply(null, events.map((e) => e.date)))));
  console.log(dates);
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
  
  const highlightEvents = events => {
    events.forEach(e => {
      e.highlighted = false
    })

    events.forEach(e => {
      if (teacherToggles[e.teacher]) {
        e.highlighted |= true
      }
      if (summaryToggles[e.summary]) {
        e.highlighted |= true
      }
      if (locationToggles[e.clientAndLocation]) {
        e.highlighted |= true
      }
      if (dayToggles[e.day]) {
        e.highlighted |= true
      }
    })
    return events
  }

  return (
    <Layout>
      <SEO title="Home"></SEO>
      <ToggleFilter toggles={teacherToggles} onToggle={k => setTeacherToggles(toggle(teacherToggles, k))}></ToggleFilter>
      <ToggleFilter toggles={summaryToggles} onToggle={k => setSummaryToggles(toggle(summaryToggles, k))}></ToggleFilter>
      <ToggleFilter toggles={locationToggles} onToggle={k => setLocationToggles(toggle(locationToggles, k))}></ToggleFilter>
      <ToggleFilter toggles={dayToggles} onToggle={k => setDayToggles(toggle(dayToggles, k))}></ToggleFilter>
      {dates.map((d) => {
      return (<div key={d.toString()}>
        <p style={{backgroundColor: "white"}}>{days[getDayIndex(d.getDay())]}: {d.getDate()}/{d.getMonth()+1}</p>
        {
          highlightEvents(events.filter(e => e.date.getTime() == d.getTime())).map(e => (
            <Event key={e.location + e.start} event={e}></Event>
          ))
        }
      </div>)})
      }
      {/* {groupBy(highlightEvents(events), e => e.date.toString()).map(g => {
        return (
          <div key={g.key.toString()}>
            
            {g.values.map(e => (
              <Event key={e.location + e.start} event={e}></Event>
            ))}
          </div>
        )
      })} */}
    </Layout>
  )
}

export default Events
