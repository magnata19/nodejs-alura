import express from 'express';
import livros from './LivroRouter.js';

const router = (app) => {
    app.route('/').get((req, res) => res.send("Curso de NodeJS"))
    app.use(express.json(), livros);
}

export default router;