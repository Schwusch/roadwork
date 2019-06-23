import React from 'react';
import { StateContext } from '../../state/StateContext.js';
import { getNestedObject } from '../../api/roadwork-api.js';
import RoadworkItem from './RoadworkItem.js';
import './Roadworks.css';

function Roadworks(props) {
  return (
    <StateContext.Consumer>
      {({ clicked, roadworks }) => {
        if (roadworks) {
          return (
            <div className="row" style={{ marginBottom: 10 }}>
              <div className="column">
                <h2>Vägarbeten</h2>
                {roadworks.map(roadwork => {
                  const deviation = getNestedObject(roadwork, ['Deviation', 0]);
                  return (
                    <RoadworkItem deviation={deviation} key={deviation.Id} />
                  );
                })}
              </div>
              <div className="column">
                <h2>Du har klickat på:</h2>
                {Object.values(clicked).map(item => {
                  return <RoadworkItem deviation={item} key={item.Id} />;
                })}
              </div>
            </div>
          );
        } else {
          return <p>Ingen data</p>;
        }
      }}
    </StateContext.Consumer>
  );
}

export default Roadworks;
