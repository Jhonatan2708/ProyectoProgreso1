import React, {useState, useEffect} from 'react';

import FireBaseApp from '../credenciales';
import {getAuth, signOut} from "firebase/auth";
import{getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

import { Container, Button } from 'react-bootstrap';

import AgregarTarea from './AgregarTarea';
import ListadoTareas from './ListadoTareas';
import { async } from '@firebase/util';

const auth = getAuth(FireBaseApp);
const firestore = getFirestore(FireBaseApp);

const Home = ({correoUsuario}) => {

  const [arrayTareas, setArrayTareas] = useState(null);

const fakeData = [
  {id: 1, descripcion:"Tarea Falsa 1", url:"https://picsum.photos/420"},
  {id: 2, descripcion:"Tarea Falsa 2", url:"https://picsum.photos/420"},
  {id: 3, descripcion:"Tarea Falsa 3", url:"https://picsum.photos/420"},
 ];

 async function buscarDocumentOrCrearDocumento(idDocumento){
   //Crear una referencia al documento
    const docuRef = doc(firestore, `usuarios/${idDocumento}`);
  //Buscar documento
    const consulta = await getDoc(docuRef);
   //Revisar si exciste 
    if (consulta.exists()){
        //Si si exciste
        const infoDocu = consulta.data();
        return infoDocu.tareas;
    } else {
        //Si no exciste 
        await setDoc(docuRef, {tareas: [...fakeData] });
        const consulta = await getDoc(docuRef);
        const infoDocu = consulta.data();
        return infoDocu.tareas;
    }
 }

  useEffect(() => {
    async function fetchTareas(){
      const tareasFetchadas = await buscarDocumentOrCrearDocumento(
        correoUsuario
        );
      setArrayTareas(tareasFetchadas);
    }

    fetchTareas();

  }, []);

  return (
    <Container>
      <h4>Hola, sesión iniciada</h4>
      <Button onClick={()=> signOut(auth)}>Cerrar Sesión</Button>
      <hr />
      <AgregarTarea
        arrayTareas={arrayTareas} 
        setArrayTareas={setArrayTareas}  
        correoUsuario={correoUsuario}
      />
      {arrayTareas ? (
      <ListadoTareas 
        arrayTareas={arrayTareas} 
        setArrayTareas={setArrayTareas}  
        correoUsuario={correoUsuario}
        />
        ):null}
    </Container>
  )
}

export default Home
