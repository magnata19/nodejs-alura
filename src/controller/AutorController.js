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

    static async listarAutoresPorId(req, res) {
        try {
            const id = req.params.id;
            const autorId = await autor.findById(id);
            res.status(200).json(autorId);
        } catch (err) {
            res.status(500).json({message: `${err.message} - Erro ao listar autor.`});
        }
    }

    static async criarAutor (req, res) {
        try {
            const autorRecebido = req.body;
            const autorCriado = await autor.create(autorRecebido);
            res.status(201).json({message: "Autor criado com sucesso!", autor: autorCriado});
        } catch (err) {
            res.status(500).json({message: `${err.message} - Erro ao criar autor.`})
        }
    }

    static async atualizarAutor (req, res) {
        try {
            const id = req.params.id;
            const autorAtualizado = await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json(autorAtualizado);
        } catch (err) {
            res.status(500).json({message: `${err.message} - Erro ao atualizar dados do autor.`})
        }
    }

    static async deletarAutor (req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndDelete(id);
            res.status(204).json({message: "Autor deletado com sucesso!"});
        } catch (err) {
            res.status(500).json({message: `${err.message} - Erro ao deletar autor.`})
        }
    }
}

export default AutorController;