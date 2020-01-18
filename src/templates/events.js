import React from "react"
import logo from "../images/logo.jpg" 

const days = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];

export default ({ pageContext: { events } }) => (
  <div>
    <div className="header">
      <div className="header2">
        <img src={logo} className="logo" />
      </div>
    </div>
    <div className="somemargin"></div>
    {events.map(x => {
      if(x.summary.toLowerCase().includes("laya")){
       return (<div className="bgimg-3 day scroll">
        <div className="caption">
          <span className="border">
            <h1>{x.summary} - <a href={`https://maps.google.com/?q=${x.address}`}>{x.client} {x.location}</a></h1>
            {x.cancelled && <h1>Cancelled :(</h1>}
            <h2>{x.teacher}</h2>
            <p>{days[new Date(x.start).getDay()]} {new Date(x.start).toLocaleTimeString('sv-SE', {hour: '2-digit', minute:'2-digit', hour12: false})} - {new Date(x.end).toLocaleTimeString('sv-SE', {hour: '2-digit', minute:'2-digit', hour12: false})}</p>
          </span>
        </div>
     </div>);
    }
    else{
      return (<div className="bgimg-2 day scroll">
        <div className="caption">
          <span className="border">
            <h1>{x.summary} - <a href={`https://maps.google.com/?q=${x.address}`}>{x.client} {x.location}</a></h1>
            {x.cancelled && <h1>Cancelled :(</h1>}
            <h2>{x.teacher}</h2>
            <p>{days[new Date(x.start).getDay()]} {new Date(x.start).toLocaleTimeString('sv-SE', {hour: '2-digit', minute:'2-digit', hour12: false})} - {new Date(x.end).toLocaleTimeString('sv-SE', {hour: '2-digit', minute:'2-digit', hour12: false})}</p>
          </span>
        </div>
     </div>);
    }
  })}
    
    {/* <div style="position:relative;">
      <div style="color:#ddd;background-color:#282E34;text-align:center;padding:50px 80px;text-align: center;">
        <p class="icons large-icons">
          <a
            href="http://www.facebook.com/rkmacharyacenter"
            target="_blank"
            class="icon icon-social-facebook"
          ></a>
          <a
            href="https://www.instagram.com/rkm.acharyacenter/"
            target="_blank"
            class="icon icon-social-instagram"
          ></a>
          <a
            href="https://www.linkedin.com/in/erika-erlando-16b82475/"
            target="_blank"
            class="icon icon-social-linkedin"
          ></a>
          <a
            href="https://twitter.com/rkm_acharya"
            target="_blank"
            class="icon icon-social-twitter"
          ></a>
          <a
            href="mailto:info@rkmacharyacenter.com"
            class="icon icon-envelope"
          ></a>
        </p>
      </div>
    </div> */}
    
  </div>
)
