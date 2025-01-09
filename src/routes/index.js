import express from 'express';
import livros from './LivroRouter.js';
import autores from './AutorRouter.js';

const router = (app) => {
    app.route('/').get((req, res) => res.send("Curso de NodeJS"))
    app.use(express.json(), livros, autores);
}

export default router;