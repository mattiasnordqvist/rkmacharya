import React from 'react';

export default ({ pageContext: { events } }) => (
  <div>
    <h1>Test</h1>
    <ul>
      {events.map(x => (
        <li>{x.start.dateTime} - {x.summary} - {x.description}</li>
      ))}
    </ul>
  </div>
)