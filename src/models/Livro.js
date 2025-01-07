import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    titulo: {type: String, required: true},
    editor: {type: String},
    preco: {type: Number},
    paginas: {type: String }
}, {versionKey: false});// versão do documento

const livro = mongoose.model('livro', livroSchema); // nome da coleção no banco de dados e o schema

export default livro;