import express from "express";
import { addCarro, deleteCarro, getCarros, updateCarro } from "../controllers/carro.js";

const router = express.Router()

router.get("/", getCarros)

router.post("/", addCarro)

router.put("/:id", updateCarro)

router.delete("/:id", deleteCarro)

export default router;