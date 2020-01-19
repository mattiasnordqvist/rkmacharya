import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const days = [
  "Måndag",
  "Tisdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lördag",
  "Söndag",
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
    <div>
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
  )
}

export default class Events extends React.Component {
  constructor(props) {
    super(props)
    var teacherFilter = uniques(
      props.pageContext.events.map(x => x.teacher)
    ).reduce((x, y) => {
      x[y] = true
      return x
    }, {})
    var summaryFilter = uniques(
      props.pageContext.events.map(x => x.summary)
    ).reduce((x, y) => {
      x[y] = true
      return x
    }, {})
    var locationFilter = uniques(
      props.pageContext.events.map(x => x.client + " " + x.location)
    ).reduce((x, y) => {
      x[y] = true
      return x
    }, {})
    var dayFilter = days.reduce((x, y) => {
      x[y] = true
      return x
    }, {})
    this.state = {
      filter: {
        teacher: teacherFilter,
        summary: summaryFilter,
        day: dayFilter,
        clientAndLocation: locationFilter,
      },
      events: props.pageContext.events,
    }
  }

  componentDidMount() {
    this.filterEvents()
  }

  toggleFilter = (e, where, what) => {
    var filter = { ...this.state.filter }
    filter[where][what] = !filter[where][what]
    this.setState({ ...this.state, filter })
    this.filterEvents()
  }

  appendData = events =>
    events.map(x => ({
      ...x,
      day: days[(new Date(x.start).getDay() + 6) % 7],
      clientAndLocation: x.client+" "+x.location,
    }))

  filterEvents = () => {
    var events = this.appendData(this.props.pageContext.events)
    var newEvents = []

    Object.keys(this.state.filter).forEach(f => {
      events.forEach(e => {
        if (this.state.filter[f][e[f]]) {
          newEvents.push(e)
        }
      })
      events = newEvents
      newEvents = []
    })

    this.setState({ ...this.state, events })
  }

  render() {
    if (this.state && this.state.filter && this.state.events) {
      return (
        
        <Layout>
          <SEO title="Home" ></SEO>
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
