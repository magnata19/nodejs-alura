import mongoose from "mongoose";

const autorSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    nome: {type: String , required: [true, "O campo nome é obrigatório!"]}, //primeiro parametro é a validação e o segundo é a mensagem de erro
    nacionalidade: {type: String, required: true}
}, {versionKey: false});


const autor = mongoose.model('autores', autorSchema);

export {autor, autorSchema};