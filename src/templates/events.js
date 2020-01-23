import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

var classNames = require('classnames');

var todayIndex = (new Date().getDay() + 6) % 7;

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

function Event({ event }) {
  var formatTime = (dateTime) => 
    new Date(dateTime).toLocaleTimeString("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  return (
    <div className={classNames({'event': true, 'visible':event.visible, 'hidden':!event.visible})}>
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

const ToggleFilter = ({values}) => {
  const [toggles, setToggles] = useState(values.reduce((x, y) => { x[y] = true; return x; }, {}));
  return (<div>
    {values.map(v => 
    <button type="button" key={v} onClick={() => setToggles(Object.assign({}, toggles, (function(attr, val){ var a = {}; a[attr]=val; return a; })(v,!toggles[v])))}> 
      {v} - {toggles[v] ? "yes" : "no"}
    </button>)}
  </div>);
}

export default class Events extends React.Component {
  constructor(props) {
    super(props)
    
    // var teacherFilter = uniques(props.pageContext.events.map(x => x.teacher)).reduce((x, y) => { x[y] = true; return x; }, {});
    // var summaryFilter = uniques(props.pageContext.events.map(x => x.summary)).reduce((x, y) => { x[y] = true; return x; }, {});
    // var locationFilter = uniques(props.pageContext.events.map(x => x.client + " " + x.location)).reduce((x, y) => { x[y] = true; return x; }, {});
    // var dayFilter = days.reduce((x, y) => { x[y] = true; return x }, {})
    var dateFilter = {
      check: (e) => e.start >= this.dates[this.active],
      dayNames: [0,1,2,3,4,5,6].map(x=>days[(x+todayIndex)%7]), 
      dates: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(x => {
        var someDay = new Date();
        someDay.setDate(new Date().getDate()+x);
        return someDay;
      }),
      active: 0};
    // var filter = {
    //   teacher: teacherFilter,
    //   summary: summaryFilter,
    //   day: dayFilter,
    //   clientAndLocation: locationFilter,
    // }
    this.state = {
      teachers: uniques(props.pageContext.events.map(x => x.teacher)),
      summaries: uniques(props.pageContext.events.map(x => x.summary)),
      days: days,
      clientsAndLocations: uniques(props.pageContext.events.map(x => x.client + " " + x.location)),
      // filter,
      events: this.appendData(props.pageContext.events)
    }
  }

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

  appendData = events =>
    events.map(x => ({
      ...x,
      day: days[(new Date(x.start).getDay() + 6) % 7],
      clientAndLocation: x.client+" "+x.location,
      visible: true
    }))

  // filterEvents = () => {
  //   var events = this.state.events;
  //   events.forEach(e => {
  //     e.visible = true;
  //   });
  //   Object.keys(this.state.filter).forEach(f => {
  //     events.forEach(e => {
  //       if (!this.state.filter[f][e[f]]) {
  //         e.visible &= false;
  //       }
  //     })
  //   });

  //   this.setState({ ...this.state, events })
  // }

  render() {
    if (this.state && this.state.events) {
      return (
        <Layout>
          <SEO title="Home"></SEO>
          <ToggleFilter values={this.state.teachers}></ToggleFilter>
          <ToggleFilter values={this.state.summaries}></ToggleFilter>
          <ToggleFilter values={this.state.days}></ToggleFilter>
          <ToggleFilter values={this.state.clientsAndLocations}></ToggleFilter>
          {/* {Object.keys(this.state.filter).map(f =>
            Object.keys(this.state.filter[f]).map(k => (
              <button
                type="button"
                onClick={e => this.toggleFilter(e, f, k)}
                key={k}
              >
                {k} - {this.state.filter[f][k] ? "yes" : "no"}
              </button>
            ))
          )} */}

          {this.state.events.map(e => (
            <Event key={e.location + e.start} event={e}></Event>
          ))}
        </Layout>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}
