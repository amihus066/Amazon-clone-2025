import { useState, useEffect, useContext } from "react";
import Header from "./Components/Header/Header";
import Carsol from "./Components/Carsole/Carsole";
import "./App.css";
import Catagory from "./Components/Catagory/Catagory";
import Product from "./Components/Product/Product";
import Routing from "./Router";
import { auth } from "./Utilities/firebase";
import { Datacontext } from "./Components/DataProvider/DataProvider";
import { Type } from "./Utilities/action.type";

function App() {
  const [{ user }, dispatch] = useContext(Datacontext);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
