import React from 'react';
import { Stack, Container, Row, Col, Button } from 'react-bootstrap';

import FireBaseApp from '../credenciales';
import{getFirestore, updateDoc, doc} from "firebase/firestore";
const firestore = getFirestore(FireBaseApp);

const ListadoTareas = ({arrayTareas, correoUsuario, setArrayTareas}) => {
  async function eliminarTarea(idTareaAEliminar){
    //crear nuevo array de tareas
    const nvoArrayTareas = arrayTareas.filter((objetoTarea)=> objetoTarea.id !==idTareaAEliminar);
    //actualizar base de datos
    const docuRef = doc(firestore, `usuarios/${correoUsuario}`); 
    updateDoc(docuRef, {tareas: [...nvoArrayTareas] });
    //actualizar state
    setArrayTareas(nvoArrayTareas);
  }
  return (
  <Container>
     <Stack>
        {arrayTareas.map((objetoTarea)=>{
            return(
                <>
                <Row>
                    <Col>{objetoTarea.descripcion}</Col>
                    <Col>
                    <Button>Ver Archivo</Button>
                    </Col>
                    <Col>
                    <Button onClick={()=> eliminarTarea(objetoTarea.id)}>Eliminar Tarea</Button>
                    </Col>
                </Row>
                <hr/>
                </>
            );
        })}
     </Stack>
       </Container>
  );
};

export default ListadoTareas