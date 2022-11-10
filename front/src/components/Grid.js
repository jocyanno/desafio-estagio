import React from 'react';
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import {Table, Thead, Tbody, Tr, Th, Td} from "../styles/gridstyles"

const Grid = ({ carros, setCarros, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = carros.filter((carro) => carro.id !== id);

        setCarros(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Modelo</Th>
          <Th>Marca</Th>
          <Th>Tipo</Th>
          <Th>Situação</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {carros.map((item, i) => (
            <Tr key={i}>
              <Td width="20%">{item.nome}</Td>
              <Td width="20%">{item.modelo}</Td>
              <Td width="20%">{item.marca}</Td>
              <Td width="20%">{item.tipo}</Td>
              <Td width="20%">{item.situacao}</Td>

              <Td alignCenter width="5%">
                <FaEdit onClick={() => handleEdit(item)} />
              </Td>
              <Td alignCenter width="5%">
                <FaTrash onClick={() => handleDelete(item.id)} />
              </Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
};

export default Grid;