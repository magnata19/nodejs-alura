import express from 'express';
import LivroController from '../controller/LivroController.js';

const router = express.Router();

router.get("/livros", LivroController.listaLivros);
router.get("/livros/search", LivroController.buscarLivrosPorEditora);
router.get("/livros/:id", LivroController.listaLivroPorId);
router.post("/livros", LivroController.criarLivro);
router.put("/livros/:id", LivroController.atualizarLivro);
router.delete('/livros/:id', LivroController.deletarLivro);

export default router;