import express from 'express';
import LivroController from '../controller/LivroController.js';
import paginar from '../middlewares/paginar.js';

const router = express.Router();

router.get("/livros", LivroController.listaLivros, paginar);
router.get("/livros/busca", LivroController.buscarLivroPorFiltro);
router.get("/livros/:id", LivroController.listaLivroPorId);
router.post("/livros", LivroController.criarLivro);
router.put("/livros/:id", LivroController.atualizarLivro);
router.delete('/livros/:id', LivroController.deletarLivro);

export default router;