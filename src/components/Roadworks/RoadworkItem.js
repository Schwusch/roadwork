import { getNestedObject } from '../../api/roadwork-api.js';
import React from 'react';

const gMapsUrl = 'https://www.google.com/maps/search/?api=1&query=';

function RoadworkItem(props) {
  let geometry = getNestedObject(props.deviation, ['Geometry', 'WGS84']);
  if (geometry) {
    const re = /\d+\.\d+/g;
    geometry = geometry.match(re);
  }
  return (
    <div>
      <a
        href={`${gMapsUrl}${geometry[1]},${geometry[0]}`}
        className="App-link"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => console.log(props.deviation.Id + ' clicked')}
      >
        {props.deviation.Message}
      </a>
    </div>
  );
}

export default RoadworkItem;
