import mongoose from "mongoose";
import { autor } from "../models/Autor.js";

class AutorController {

    static async listarAutores(req, res) {
        try {
            const autores = await autor.find({});
            res.status(200).json(autores);
        } catch (err) {
            res.status(500).json({message: `${err.message} - Erro ao listar autores.`})
        }
    }

    static async listarAutoresPorId(req, res, next) {
        try {
            const id = req.params.id;
            const autorResultado = await autor.findById(id);
            if(autorResultado !== null) {
                res.status(200).json(autorResultado);
            } else {
                res.status(404).json({message: "Erro ao listar autor."});
            }
        } catch (err) {
<<<<<<< HEAD
            next(err);
=======
            if(err instanceof mongoose.Error.CastError) {
                res.status(400).send({message: "Dados(os) inválidos(os)."});
            } else {
                res.status(500).json({message: 'Erro interno de servidor.', error: err.message});
            }
>>>>>>> 2ac67b5efb771213ac62aadd679b6328cb3940d0
        } 
    }

    static async criarAutor (req, res, next) {
        try {
            const autorRecebido = req.body;
            const autorCriado = await autor.create(autorRecebido);
            res.status(201).json({message: "Autor criado com sucesso!", autor: autorCriado});
        } catch (err) {
            next(err);
        }
    }

    static async atualizarAutor (req, res, next) {
        try {
            const id = req.params.id;
            const autorAtualizado = await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json(autorAtualizado);
        } catch (err) {
            next(err);
        }
    }

    static async deletarAutor (req, res, next) {
        try {
            const id = req.params.id;
            await autor.findByIdAndDelete(id);
            res.status(204).json({message: "Autor deletado com sucesso!"});
        } catch (err) {
            next(err);
        }
    }
}

export default AutorController;