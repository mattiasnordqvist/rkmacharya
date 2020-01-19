import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import { CSSTransition, transit } from "react-css-transition";

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
  return (
    <CSSTransition
      defaultStyle={{ opacity: 1, height:150, marginTop:10 }}
      enterStyle={{ opacity: transit(0, 500, "ease-in-out"), height: transit(0, 500, "ease-in-out"), marginTop: transit(10, 50, "ease-in-out")}}
      leaveStyle={{ opacity: transit(1.0, 500, "ease-in-out"), height: transit(150, 500, "ease-in-out"), marginTop: transit(0, 50, "ease-in-out") }}
      activeStyle={{ opacity: 0, height: 0, marginTop:0 }}
      active={!event.visible}
    >
    <div className="event">
      <h3>
        {event.summary} -{" "}
        <a href={`https://maps.google.com/?q=${event.address}`}>
          {event.client} {event.location}
        </a>
      </h3>
      {event.cancelled && <h4>Cancelled :(</h4>}
      <h4>{event.teacher}</h4>
      <p>
        {event.day}{" "}
        {new Date(event.start).toLocaleTimeString("sv-SE", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}{" "}
        -{" "}
        {new Date(event.end).toLocaleTimeString("sv-SE", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </p>
    </div>
    </CSSTransition>
  )
}

export default class Events extends React.Component {
  constructor(props) {
    super(props)
    var teacherFilter = uniques(props.pageContext.events.map(x => x.teacher)).reduce((x, y) => { x[y] = true; return x; }, {});
    var summaryFilter = uniques(props.pageContext.events.map(x => x.summary)).reduce((x, y) => { x[y] = true; return x; }, {});
    var locationFilter = uniques(props.pageContext.events.map(x => x.client + " " + x.location)).reduce((x, y) => { x[y] = true; return x; }, {});
    var dayFilter = days.reduce((x, y) => { x[y] = true; return x }, {})

    var filter = {
      teacher: teacherFilter,
      summary: summaryFilter,
      day: dayFilter,
      clientAndLocation: locationFilter,
    }
    this.state = {
      filter,
      events: this.appendData(props.pageContext.events)
    }
  }

  componentDidMount() {
    if(localStorage.getItem("filter"))
    {
      var newFilter = this.state.filter;
      var oldFilter = JSON.parse(localStorage.getItem("filter"));
      Object.keys(newFilter).forEach(x => 
      {
        console.log(x);
        Object.keys(newFilter[x]).forEach(y => {
          if(oldFilter.hasOwnProperty(x) && newFilter[x].hasOwnProperty(y)){
            newFilter[x][y] = oldFilter[x][y];
          }
        })
      });
      localStorage.setItem("filter", JSON.stringify(newFilter));
      this.setState({filter:newFilter});
    }
    this.filterEvents()
  }

  toggleFilter = (e, where, what) => {
    var filter = { ...this.state.filter }
    filter[where][what] = !filter[where][what];
    localStorage.setItem('filter', JSON.stringify(filter));
    this.setState({ ...this.state, filter });
    this.filterEvents();
  }

  appendData = events =>
    events.map(x => ({
      ...x,
      day: days[(new Date(x.start).getDay() + 6) % 7],
      clientAndLocation: x.client+" "+x.location,
    }))

  filterEvents = () => {
    var events = this.state.events;
    events.forEach(e => {
      e.visible = true;
    });
    Object.keys(this.state.filter).forEach(f => {
      events.forEach(e => {
        if (!this.state.filter[f][e[f]]) {
          e.visible &= false;
        }
      })
    });

    this.setState({ ...this.state, events })
  }

  render() {
    if (this.state && this.state.filter && this.state.events) {
      return (
        <Layout>
          <SEO title="Home"></SEO>
          {Object.keys(this.state.filter).map(f =>
            Object.keys(this.state.filter[f]).map(k => (
              <button
                type="button"
                onClick={e => this.toggleFilter(e, f, k)}
                key={k}
              >
                {k} - {this.state.filter[f][k] ? "yes" : "no"}
              </button>
            ))
          )}

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
