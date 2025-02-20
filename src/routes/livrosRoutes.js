import express from "express";
import LivroController from "../controllers/livroController.js";
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes.get("/livros", LivroController.listarLivros, paginar);
routes.get("/livros/busca", LivroController.listarLivroPorFiltro, paginar);
routes.get("/livros/:id", LivroController.listarLivroPorFiltro);
routes.post("/livros", LivroController.cadastrarLivro);
routes.put("/livros/:id", LivroController.atualizarLivros);
routes.delete("/livros/:id", LivroController.deletarLivro);

export default routes;