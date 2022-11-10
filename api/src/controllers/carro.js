import { db } from '../../db.js';

export const getCarros = (_, res) =>{
  const q = "SELECT * FROM carros";

  db.query(q, (err, data)=>{
    //faz a verificação se tiver erro retorna em json com o erro.
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addCarro = (req, res) => {
  const q =
    "INSERT INTO carros(`nome`, `modelo`, `marca`, `tipo`, `situacao`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.modelo,
    req.body.marca,
    req.body.tipo,
    req.body.situacao,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Carro cadastrado com sucesso.");
  });
};

export const updateCarro = (req, res) => {
  const q =
    "UPDATE carros SET `nome` = ?, `modelo` = ?, `marca` = ?, `tipo` = ?, `situacao` = ? WHERE `id` = ?";

  const values = [
    req.body.nome,
    req.body.modelo,
    req.body.marca,
    req.body.tipo,
    req.body.situacao,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Carro atualizado com sucesso.");
  });
};

export const deleteCarro = (req, res) => {
  const q = "DELETE FROM carros WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Carro deletado com sucesso.");
  });
};
