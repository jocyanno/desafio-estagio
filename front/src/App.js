
import GlobalStyle from './styles/global';
import styled from 'styled-components';
import Form from "./components/Form.js";
import Grid from "./components/Grid.js"
import { useState, useEffect } from 'react';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import {toast, ToastContainer} from 'react-toastify';

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Footer = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #D3D3D3;
  color: black;
  text-align: center;
`;
const Title = styled.h2`
  color: #fff;
  align-items: center;
  justify-content: center;
  `;

function App() {
  const[carros, setCarro] = useState([]);
  const[onEdit, setOnEdit] = useState(null);

  const getCarros = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setCarro(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getCarros();
  }, [setCarro]);

  return (
    <>
      <Container>
        <Title>Locadora de Carros</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getCarros={getCarros}/>
        <Grid setOnEdit={setOnEdit} carros={carros} setCarros={getCarros}/>
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle/>
      <Footer>Todos Direitos Reservados Jocyanno Vittor</Footer>
    </>
    
  );
}

export default App;
