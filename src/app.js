import express from 'express';

const app = express();
app.use(express.json());

const carros = [
    {
        id: 1,
        marca:"Toyota",
        nome:"Supra"
    },
    {
        id: 2,
        marca:"Mazda",
        nome:"RX7"
    }
];

function buscarCarros(id) {
    return carros.findIndex(carro => {
        return carro.id === Number(id);
    })
}

app.get("/", (req, res) => {
    res.status(200).send("Curso de nodeJS");
});

app.get("/carros", (req, res) => {
    res.status(200).json(carros);
});

app.get("/carros/:id", (req, res) => {
    const index = buscarCarros(req.params.id);
    res.status(200).send(carros[index])
    
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