import express from 'express';
import AutorController from '../controller/AutorController.js'

const router = express.Router();

router.get('/autores', AutorController.listarAutores);
router.get('/autores/:id', AutorController.listarAutoresPorId);
router.post('/autores', AutorController.criarAutor);
router.put('/autores/:id', AutorController.atualizarAutor);
router.delete('/autores/:id', AutorController.deletarAutor);

export default router;