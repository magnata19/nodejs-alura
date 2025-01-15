import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    titulo: {type: String, required: [true, "O campo título é obrigatório!"]},
    editora: {type: String, required: [true, "O campo editora é obrigatório!"],
        enum: {
            values: ["Casa do código", "Alura","java script"],
            message:"{VALUE} não é um valor válido para o campo {PATH}."
        }
    },
    preco: {type: Number},
    paginas: {type: Number,
        validate: {
            validator: (value) => {
                return value >= 10 && value <= 5000;
            },
            message: "O número de páginas deve estar entre 10 e 5000. Valor informado: {VALUE}"
        }
    },
    autor: autorSchema,
}, {versionKey: false});// versão do documento

const livro = mongoose.model('livro', livroSchema); // nome da coleção no banco de dados e o schema

export default livro;