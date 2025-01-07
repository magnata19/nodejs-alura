import express from 'express';
import connectDataBase from './config/dbconnect.js';
import livro from './models/Livro.js';

const connection = await connectDataBase();

connection.on("error", (err) => {
    console.error('erro de conexao', err);
})

connection.once('open', () => {
    console.log('Conectado ao banco de dados com sucesso!');
})

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Curso de nodeJS");
});

app.get("/livros", async (req, res) => {
    const listaLivros = await livro.find({});
    res.status(200).json(listaLivros);
});

app.get("/carros/:id", async (req, res) => {
    const livroId = await livro.findById(req.params.id);
    res.status(200).json(livroId);
    
})

app.post("/carros",(req, res) => {
    carros.push(req.body);
    res.status(201).send("Carro cadastrado com sucesso!!");
});

app.put("/carros/:id", (req, res) => {
    const index = buscarCarros(req.params.id);
    carros[index].marca = req.body.marca;
    carros[index].nome = req.body.nome;
    res.status(200).json(carros)
})

app.delete("/carros/:id", (req, res) => {
    const index = buscarCarros(req.params.id);
    carros.splice(index, 1);
    res.status(200).send("Livro removido com sucesso.");
})

export default app;