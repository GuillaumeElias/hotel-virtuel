import React from "react";

const defaultGlobalState = {
  name: "",
  forename: "",
  catLines: [],
  catImage: null,
  registeted: false,
  soundVolume: 1
};

const GlobalStateContext = React.createContext(defaultGlobalState);
const DispatchStateContext = React.createContext(undefined);

const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({ ...state, ...newValue }),
    defaultGlobalState
  );
  return (
    <GlobalStateContext.Provider value={state}>
      <DispatchStateContext.Provider value={dispatch}>
        {children}
      </DispatchStateContext.Provider>
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => [
  React.useContext(GlobalStateContext),
  React.useContext(DispatchStateContext)
];

export { GlobalStateContext, GlobalStateProvider, useGlobalState };
