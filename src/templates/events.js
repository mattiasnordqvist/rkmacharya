import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form,Accordion,Card,Button,Image } from "react-bootstrap";


var classNames = require("classnames")
const getDayIndex = (day) => (day + 6) % 7;

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

const uniques = function (arr) {
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


    <div className="card">
      <div className={classNames({ highlighted: event.highlighted, event: true, card: true })}>
        <div className="card-body">
          <h5 className="card-title">
            {event.summary}
          </h5>
          <div className="a">
          <a href={`https://maps.google.com/?q=${event.address}`}>
            {event.client} {event.location}
          </a></div>
          <div className="card-text">
            {event.cancelled && <h6>Cancelled :(</h6>}
            <h6>{event.teacher}</h6>
           <p style={{fontSize: 14}}>{event.day} {formatTime(event.start)} - {formatTime(event.end)}</p>
          </div>


        </div>

      </div>
    </div>
  )
}
const buildRow = (data) => {
    
  
  let table = []

  for(let key in data){
    console.log( "hej " ,key)
    let children = []
    //Inner loop to create children
    data[key].map((object,i) =>{
      children.push(<Event key={object.location + object.start} event={object}/>)
    })
   
    table.push(<td>{children}</td>)
  }
    return(
      <tr>
        {table}
      </tr>
    )
  }
  const buildHeader = (header) => {
    
    let th = header.map((k, index) => {
      var d = new Date(k);
      if(index === 7){
        return
      }

      return <th key={index}>{d.toDateString()}</th>  
    })
    return (
      <tr>{th}</tr>
    )
  }

const GetRowsData = ({ events }) => {
  const grouped = {}

  const max = new Date();
  max.setDate(new Date().getDate() + 7)
  const dates = generateDates(DatePart(new Date()), DatePart(max));
 
  dates.map(obj => {
    const apa = Object.values(events).filter(event => event.date.getTime() === obj.getTime());
    const sent = apa.filter(d => d.date < max)
    grouped[obj] = sent;
  })
  return (
  <table className="table table-responsive" style={{marginTop: 10}}>
    <h3>
      Kommande 7 dagar
    </h3>
  <thead >
    {buildHeader(Object.keys(grouped))}
  </thead>
  <tbody>
    {buildRow(grouped)}
  </tbody>
</table>
)
  
}




const ToggleFilter = ({ toggles, onToggle }) => {
  return (
    <Form >
       {Object.keys(toggles).map(k => (
        
        <div key={k} className="mb-3 form-check form-check-inline" >
        <Form.Check 
           onClick={() => onToggle(k)}
          label={`${k}`}
        />
      </div>
     
        // <button type="button" key={k} onClick={() => onToggle(k)}>
        //   {k} - {toggles[k] ? "yes" : "no"}
        // </button>
      ))}
      </Form>
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
    (function (attr, val) {
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


const DatePart = (d) => new Date(d.setHours(0, 0, 0, 0));

const Events = props => {
  const [events, setEvents] = useState(appendData(props.pageContext.events))
  const [teacherToggles, setTeacherToggles] = useState(createToggles(events.map(x => x.teacher)))
  const [summaryToggles, setSummaryToggles] = useState(createToggles(events.map(x => x.summary)))
  const [locationToggles, setLocationToggles] = useState(createToggles(events.map(x => x.clientAndLocation)))
  const [dayToggles, setDayToggles] = useState(createToggles(days))
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

  const highlightEvents = events => {
    events.forEach(e => {
      var anyfilter = false;
      e.highlighted = true
      if (Object.values(teacherToggles).some(x => x)) {
        e.highlighted &= teacherToggles[e.teacher]
        anyfilter = true;
      }
      if (Object.values(summaryToggles).some(x => x)) {
        e.highlighted &= summaryToggles[e.summary]
        anyfilter = true;
      }
      if (Object.values(locationToggles).some(x => x)) {
        e.highlighted &= locationToggles[e.clientAndLocation]
        anyfilter = true;
      }
      if (Object.values(dayToggles).some(x => x)) {
        e.highlighted &= dayToggles[e.day]
        anyfilter = true;
      }
      if (!anyfilter) {
        e.highlighted = false;
      }
    })
    return events
  }
  return (
    <Layout>
      <SEO title="Home"></SEO>
     
      <Accordion>
      
            <Accordion.Toggle as={Button} eventKey="0" variant=" btn-sm light">
            <Image src={require("../styles/filter.png")} style={{marginTop: 20}}/>
              Filtrera
           </Accordion.Toggle>
         
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <ToggleFilter toggles={teacherToggles} onToggle={k => setTeacherToggles(toggle(teacherToggles, k))}></ToggleFilter>
              <ToggleFilter toggles={summaryToggles} onToggle={k => setSummaryToggles(toggle(summaryToggles, k))}></ToggleFilter>
              <ToggleFilter toggles={locationToggles} onToggle={k => setLocationToggles(toggle(locationToggles, k))}></ToggleFilter>
              <ToggleFilter toggles={dayToggles} onToggle={k => setDayToggles(toggle(dayToggles, k))}></ToggleFilter>
            </Card.Body>
          </Accordion.Collapse>
        
      </Accordion>
      <GetRowsData events={events}/>
      
     
      {dates.map((d) => {
        {highlightEvents(events.filter(e => e.date.getTime() == d.getTime()))}     
       }) 
      }
      
  
      {/* {dates.map((d,i) => {
        return (
            

          <div key={d.toString()}className="row">
            {
              highlightEvents(events.filter(e => e.date.getTime() == d.getTime())).map(e => (
                <GetRowsData events={events}/>
              ))
            }</div>
        )
      })
      } */}
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


