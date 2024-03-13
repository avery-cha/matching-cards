import React from 'react'

export const NumberContext = React.createContext({
  number: 0,
  setNumber: () => {}
});

export default NumberContext;