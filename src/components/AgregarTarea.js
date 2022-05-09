import { async } from '@firebase/util';
import React from 'react';
import { Container, Form, Col, Row, Button } from 'react-bootstrap';

import FireBaseApp from '../credenciales';
import {doc, getFirestore, updateDoc} from "firebase/firestore";
const firestore = getFirestore(FireBaseApp);

const AgregarTarea = ({correoUsuario, setArrayTareas, arrayTareas}) => {let urlDescarga;
  
  async function añadirTarea (e){
    e.preventDefault();
    const descripcion = e.target.formDescripcion.value;
    //crear nuevo array de tareas
    const nvoArrayTareas = [...arrayTareas, 
      {
        id: + new Date() ,
        descripcion: descripcion, 
        url: "",
      },
    ];
    //actualizar base de datos
    const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
    updateDoc(docuRef, { tareas: [...nvoArrayTareas]});
    //actualizar estado
    setArrayTareas(nvoArrayTareas);
    //limpiar form
    e.target.formDescripcion.value = "";
  }

  return <Container>
    <Form onSubmit={añadirTarea}>
      <Row>
        <Col><Form.Control type="text" placeholder="Describe tu tarea" id="formDescripcion" /></Col>
        <Col><Form.Control type="file" placeholder="Añade archivo" /></Col>
        <Col>
        <Button type="submit">AgregarTarea</Button>
        </Col>
      </Row>
    </Form>
  </Container>;
}; 

export default AgregarTarea;