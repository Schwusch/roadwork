import { getNestedObject } from '../../api/roadwork-api.js';
import { StateContext } from '../../state/StateContext.js';
import React, { useContext } from 'react';
import './Roadworks.css';

const gMapsUrl = 'https://www.google.com/maps/search/?api=1&query=';

function RoadworkItem(props) {
  const { deviation } = props;
  const { setContext, clicked } = useContext(StateContext);

  let geometry = getNestedObject(deviation, ['Geometry', 'WGS84']);
  if (geometry) {
    const re = /\d+\.\d+/g;
    geometry = geometry.match(re);
  }
  return (
    <div
      className="row"
      style={{ borderColor: clicked[deviation.Id] ? 'lightgreen' : 'grey' }}
    >
      <a
        href={`${gMapsUrl}${geometry[1]},${geometry[0]}`}
        className="App-link"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          const updClicked = { ...clicked };
          updClicked[deviation.Id] = deviation;
          setContext({ clicked: updClicked });
        }}
      >
        {deviation.Message}
      </a>
    </div>
  );
}

export default RoadworkItem;
