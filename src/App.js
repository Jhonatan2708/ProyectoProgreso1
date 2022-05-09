import React,{useState, useEffect} from "react";
import Home from "./components/Home";
import { Logueo } from "./components/Logueo";

import FireBaseApp from "./credenciales";
import {getAuth, onAuthStateChanged, OnAuthStateChanged} from "firebase/auth";
const auth =  getAuth(FireBaseApp);


function App() {
  const [usuarioGlobal, setUsuarioGlobal]= useState(null);

  onAuthStateChanged(auth,(usuarioFirebase)=>{
    if(usuarioFirebase){
      //codigo en caso de que haya sesion iniciada
       setUsuarioGlobal(usuarioFirebase);
    } else {
      //codigo en caso de que no haya sesion iniciada
      setUsuarioGlobal(null); 
    }
  });

  return (
  <>
  {usuarioGlobal ? (
    <Home correoUsuario = {usuarioGlobal.email}/>
    ) : (
    <Logueo/>
    )}
    </>
  );
}

export default App;
