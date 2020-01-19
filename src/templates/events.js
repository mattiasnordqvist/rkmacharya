import React from "react"

const days = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];

const uniques = function(arr) {
  var a = [];
  for (var i=0, l=arr.length; i<l; i++)
      if (a.indexOf(arr[i]) === -1 && arr[i] !== '')
          a.push(arr[i]);
  return a;
}

function Event({event}){
    return (<div>
        <h3>{event.summary} - <a href={`https://maps.google.com/?q=${event.address}`}>{event.client} {event.location}</a></h3>
        {event.cancelled && <h4>Cancelled :(</h4>}
        <h4>{event.teacher}</h4>
        <p>{days[new Date(event.start).getDay()]} {new Date(event.start).toLocaleTimeString('sv-SE', {hour: '2-digit', minute:'2-digit', hour12: false})} - {new Date(event.end).toLocaleTimeString('sv-SE', {hour: '2-digit', minute:'2-digit', hour12: false})}</p>
    </div>);
    }

export default class Events extends React.Component
{
  constructor(props) {
    super(props);
    var teacherFilter = uniques(props.pageContext.events.map(x => x.teacher)).reduce((x,y) => {x[y] = true; return x;}, {});
    var summaryFilter = uniques(props.pageContext.events.map(x => x.summary)).reduce((x,y) => {x[y] = true; return x;}, {});
    this.state = { filter: {
      teacher: teacherFilter,
      summary: summaryFilter
    }, events: props.pageContext.events };
  }

  filter = (e, where, what) => {
    var filter = {...this.state.filter}
    filter[where][what] = !filter[where][what];

    var events = this.props.pageContext.events;
    var newEvents = [];

    Object.keys(this.state.filter).forEach(f => {
      events.forEach(e => {
        if(this.state.filter[f][e[f]]){
          newEvents.push(e);
        }
      });
      events = newEvents;
      newEvents = [];  
    });

    this.setState({filter, events});
  }

  render()
  {
    return (
      <div>
        {Object.keys(this.state.filter).map((f) => 
         Object.keys(this.state.filter[f]).map((k) => 
          <button type="button" onClick={(e) => this.filter(e,f,k)}key={k}>{k} - {this.state.filter[f][k] ? 'yes':'no'}</button>
        ))}
       
        {this.state.events.map((e) => 
          <Event key={e.location+e.start} event={e}></Event>
        )}
      </div>);
  }
}