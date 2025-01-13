import {livro} from '../models/index.js';
import { autor } from '../models/index.js';

class LivroController {

    static async listaLivros(req, res, next) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch (err) {
            next(err);
        }
    }

    static async listaLivroPorId(req, res, next) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            if(livroEncontrado !== null) {
                res.status(200).json(livroEncontrado);
            } else {
                res.status(404).json({message: "Erro ao listar livro por id."})
            }
        } catch (err) {
            next(err);
        }
    }

    static async criarLivro(req, res, next) {
        try {
            const novoLivro = req.body;
            const autorEncontrado = await autor.findById(novoLivro.autor);
            if(!autorEncontrado) {
                res.status(400).json({message: "Autor não encontrado."});
                return;
            }
            const livroCopiado = {...novoLivro, autor:{...autorEncontrado._doc}};
            const livroCriado = await livro.create(livroCopiado);
            res.status(201).json({message:"Livro criado com sucesso!", livro: livroCriado});
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async atualizarLivro(req, res, next) {
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Livro atualizado com sucesso!"});
        } catch (err) {
            next(err);
        }
    }

    static async deletarLivro(req, res, next) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(204).json({message: "Livro deletado com sucesso!"});
        } catch (err) {
            next(err);
        }
    }

    static async buscarLivrosPorEditora(req, res, next) {
        const editora = req.query.editor;
        try {
            const livrosPorEditora = await livro.find({editor: editora});
            res.status(200).json(livrosPorEditora);
        } catch (err) {
            next(err);
        }
    }
};

export default LivroController;