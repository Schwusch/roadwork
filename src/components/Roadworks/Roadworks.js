import React, { useState, useEffect, useContext } from 'react';
import { StateContext } from '../../state/StateContext.js';
import { fetchRoadworks, getNestedObject } from '../../api/roadwork-api.js';
import RoadworkItem from './RoadworkItem.js';

function Roadworks() {
  let [data, setData] = useState(null);
  const { apiKey } = useContext(StateContext);

  useEffect(() => {
    fetchRoadworks(apiKey).then(setData);
  }, [apiKey]);

  console.log(data);
  return (
    <StateContext.Consumer>
      {({ clicked }) => {
        if (data) {
          return (
            <div>
              {data.map(item => {
                const deviation = getNestedObject(item, ['Deviation', 0]);
                return (
                  <RoadworkItem deviation={deviation} key={deviation.Id} />
                );
              })}
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
