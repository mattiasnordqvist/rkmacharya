import React, { useState, useEffect } from 'react';
var classNames = require("classnames")

const formatTime = dateTime =>
  new Date(dateTime).toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

const Event = ({ event, select }) => {
  var diffMs = new Date(event.end) - new Date(event.start)
  var diffMins = Math.round(diffMs / 60000)
  const [dh, setDh] = useState(false);

  useEffect(() => {
      let timer1 = setTimeout(() => setDh(new Date(event.start) <= new Date()), 0);

      // this will clear Timeout when component unmount like in willComponentUnmount
      return () => {
        clearTimeout(timer1)
      }
    },
    []);

  return (
    <div
      className={classNames({
        cancelled: event.cancelled,
        event: true,
        dehighlighted: dh
      })}
    >
      {event.hasNote && (<div className="class-note">{event.note}</div>)}
      <div className="class-time">
        <span className="class-time-start">{formatTime(event.start)}</span>
        <span className="class-time-duration"> {diffMins} min</span>
      </div>
      <div className="class-summary">
        <span className="class-summary-text">{event.summary}</span>
        <span className="class-summary-teacher">{event.teacher}</span>
      </div>
      <div className="class-location">
        <span>
          {
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className={classNames({ web: event.isWebinar })}
            >
              {event.client} {event.isWebinar ? "(online)" : event.location}
            </a>
          }
        </span>
        <span className="class-book">
          {event.book && !event.cancelled && !dh && (
            <button onClick={() => select()}>Book</button>
          )}
        </span>
      </div>
    </div>
  )
}

export default Event
