import mongoose from "mongoose";
import { autor } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

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
                next(new NaoEncontrado("Erro ao listar autor por id."));
            }
        } catch (err) {
            next(err);
            if(err instanceof mongoose.Error.CastError) {
                res.status(400).send({message: "Dados(os) inválidos(os)."});
            } else {
                res.status(500).json({message: 'Erro interno de servidor.', error: err.message});
            }
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
            if(autorAtualizado !== null) {
                res.status(200).json(autorAtualizado);
            } else {
                next(new NaoEncontrado("Autor não encontrado por id."));
            }
        } catch (err) {
            next(err);
        }
    }

    static async deletarAutor (req, res, next) {
        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findByIdAndDelete(id);
            if(autorEncontrado !== null) {
                res.status(204).json({message: "Autor deletado com sucesso!"});
            } else {
                next(new NaoEncontrado("Autor não encontrado por id."));
            }
        } catch (err) {
            next(err);
        }
    }
}

export default AutorController;