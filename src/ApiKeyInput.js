import React, { useState } from 'react';
import { StateContext } from './StateContext.js';

function ApiKeyInput() {
    const [input, setInput] = useState('');
    return (
        <div>
            <label>Skriv in din <code>api</code>-nyckel du fått från Vägverket </label>
            <input value={input} onChange={e => setInput(e.target.value)}/>
            <StateContext.Consumer>
                {({setContext}) => (
                    <button onClick={() => setContext({apiKey: input})} disabled={input.length !== 32}>OK</button>
                )}
            </StateContext.Consumer>
        </div>
    );
}
export default ApiKeyInput;