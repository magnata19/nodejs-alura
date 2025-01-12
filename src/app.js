import express from 'express';
import connectDataBase from './config/dbconnect.js';
import router from './routes/index.js';
import manipuladorDeErros from './middlewares/manipuladorDeErros.js';
import manipulador404 from './middlewares/manipulador404.js';

const connection = await connectDataBase();

connection.on("error", (err) => {
    console.error('erro de conexao', err);
})

connection.once('open', () => {
    console.log('Conectado ao banco de dados com sucesso!');
})

const app = express();
router(app);

app.use(manipulador404);
app.use(manipuladorDeErros);


export default app;