import React, {useRef, useEffect} from 'react';
import { toast } from "react-toastify";
import axios from "axios";
import {InputArea, Input, FormContainer, Label, Button} from '../styles/formulario'

const Form = ({getCarros, onEdit, setOnEdit}) => {
  const ref=useRef();

  useEffect(() => {
    if (onEdit) {
      const carros = ref.current;
      carros.nome.value = onEdit.nome;
      carros.modelo.value = onEdit.modelo;
      carros.marca.value = onEdit.marca;
      carros.tipo.value = onEdit.tipo;
      carros.situacao.value = onEdit.situacao;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const carros = ref.current;

    if (
      !carros.nome.value ||
      !carros.modelo.value ||
      !carros.marca.value ||
      !carros.tipo.value ||
      !carros.situacao.value 
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          nome: carros.nome.value,
          modelo: carros.modelo.value,
          marca: carros.marca.value,
          tipo: carros.tipo.value,
          situacao: carros.situacao.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          nome: carros.nome.value,
          modelo: carros.modelo.value,
          marca: carros.marca.value,
          tipo: carros.tipo.value,
          situacao: carros.situacao.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    carros.nome.value = "";
    carros.modelo.value = "";
    carros.marca.value = "";
    carros.tipo.value = "";
    carros.situacao.value = "";

    setOnEdit(null);
    getCarros();
  };

  return (

    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>Modelo</Label>
        <Input name="modelo"/>
      </InputArea>
      <InputArea>
        <Label>Marca</Label>
        <Input name="marca" />
      </InputArea>
      <InputArea>
        <Label>Tipo</Label>
        <select name="tipo">
            <option value=""></option>
            <option value="hatch">hatch</option>
            <option value="sedan ">sedan </option>
            <option value="SUV">SUV</option>
        </select>
      </InputArea>
        <InputArea> 
          <Label>Situação</Label>
          <select name="situacao">
            <option value=""></option>
            <option value="Disponível">Disponível</option>
            <option value="Indisponível">Indisponível</option>
          </select>
        </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
    
  );
};

export default Form;