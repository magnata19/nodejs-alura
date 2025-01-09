import express from 'express';
import connectDataBase from './config/dbconnect.js';
import router from './routes/index.js';

const connection = await connectDataBase();

connection.on("error", (err) => {
    console.error('erro de conexao', err);
})

connection.once('open', () => {
    console.log('Conectado ao banco de dados com sucesso!');
})

const app = express();
router(app);

export default app;