import React, { useState, useEffect, useContext } from 'react';
import { StateContext } from './StateContext.js';
import { fetchRoadworks, getNestedObject } from "./api/roadwork-api.js";

const gMapsUrl = "https://www.google.com/maps/search/?api=1&query="

function Roadworks() {
    let [data, setData] = useState(null);
    const {apiKey} = useContext(StateContext);

    useEffect(() => { fetchRoadworks(apiKey).then(setData) }, [apiKey]);

    console.log(data);
    return (
        <StateContext.Consumer>
        {({clicked}) => { 
            if(data) {
                return (<div>
                    {data.map((item) => {
                        let deviation = getNestedObject(item, ["Deviation", 0]);
                        let geometry = getNestedObject(deviation, ["Geometry", "WGS84"]);
                        if(geometry) {
                            const re = /\d+\.\d+/g;
                            geometry = geometry.match(re);
                        }
                        return (<div key={deviation.Id}>
                            <a 
                                href={`${gMapsUrl}${geometry[1]},${geometry[0]}`}
                                className="App-link"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => console.log(deviation.Id + " clicked")}
                            >
                                {deviation.Message}
                            </a>
                            
                        </div>)
                    })}
                    </div>)
            } else {
                return (<p>Ingen data</p>)
            }
        }}
    </StateContext.Consumer>
    )
}

export default Roadworks;