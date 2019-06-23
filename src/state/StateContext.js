import React from 'react';

export const StateContext = React.createContext({
  apiKey: '',
  clicked: {},
  roadworks: [],
  setContext: () => {}
});
