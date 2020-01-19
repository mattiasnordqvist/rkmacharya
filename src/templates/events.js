import React from "react"

const days = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];

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
    this.state = { filter: {
      teacher : {'Alice Henry': true, 'Erika Erlando': true },
      summary : {'Layayoga': true, 'Acharyayoga': true, 'Layayoga Seniors': true}
    }, events: props.pageContext.events };
  }

  filter = (e, where, what) => {
    var filter = {...this.state.filter}
    filter[where][what] = !filter[where][what];

    var events = this.props.pageContext.events;
    var newEvents = [];
    events.forEach(e => {
      if(filter.teacher[e.teacher]){
        newEvents.push(e);
      }
    });
    events = newEvents;

    newEvents = [];
    events.forEach(e => {
      if(filter.summary[e.summary]){
        newEvents.push(e);
      }
    });
    events = newEvents;

    this.setState({filter, events: newEvents});
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