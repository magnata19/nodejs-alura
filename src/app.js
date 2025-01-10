import express from 'express';
import connectDataBase from './config/dbconnect.js';
import router from './routes/index.js';
import manipuladorDeErros from './middlewares/manipuladorDeErros.js';

const connection = await connectDataBase();

connection.on("error", (err) => {
    console.error('erro de conexao', err);
})

connection.once('open', () => {
    console.log('Conectado ao banco de dados com sucesso!');
})

const app = express();
router(app);

app.use(manipuladorDeErros);

export default app;