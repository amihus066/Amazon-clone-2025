import React, { createContext, useContext, useReducer } from "react";
import { reducer } from "../../Utilities/reducer";
import { initialState } from "../../Utilities/reducer";

export const Datacontext = createContext(); //initiating creat context

function DataProvider({ children, reducer, initialState }) {
  return (
    <Datacontext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </Datacontext.Provider>
  );
}

export default DataProvider;
