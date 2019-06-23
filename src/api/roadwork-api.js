const apiUrl = 'https://api.trafikinfo.trafikverket.se/v2/data.json';

export const getNestedObject = (nestedObj, pathArr) => {
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined),
    nestedObj
  );
};

export function fetchRoadworks(apiKey) {
  const query = `<REQUEST>
    <LOGIN authenticationkey="${apiKey}" />
    <QUERY objecttype="Situation" schemaversion="1.2" limit="10">
    <FILTER>
        <ELEMENTMATCH>
            <EQ name="Deviation.MessageType" value="Vägarbete" />
        </ELEMENTMATCH>
    </FILTER>
    <INCLUDE>Deviation.Header</INCLUDE>
    <INCLUDE>Deviation.Id</INCLUDE>
    <INCLUDE>Deviation.Message</INCLUDE>
    <INCLUDE>Deviation.MessageType</INCLUDE>
    <INCLUDE>Deviation.Geometry.WGS84</INCLUDE>
    </QUERY>
  </REQUEST>`;

  return fetch(apiUrl, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'text/xml'
    },
    body: query
  })
    .then(response => response.json())
    .then(data =>
      getNestedObject(data, ['RESPONSE', 'RESULT', 0, 'Situation'])
    );
}
