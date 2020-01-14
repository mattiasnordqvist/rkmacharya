import React from "react"
import logo from "../images/logo.jpg" 
export default ({ pageContext: { events } }) => (
  <div>
    <div class="header">
      <div class ="header2">
        <img src={logo} class="logo" />
      </div>
    </div>
    <div class="somemargin"></div>
    {events.map(x => {
      if(x.summary.toLowerCase().includes("laya")){
       return (<div class="bgimg-3 day scroll">
        <div class="caption">
          <span class="border">
            {x.start.dateTime} - {x.summary} - {x.description}
          </span>
        </div>
     </div>);
    }
    else{
      return (<div class="bgimg-2 day scroll">
        <div class="caption">
          <span class="border">
            {x.start.dateTime} - {x.summary} - {x.description}
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
