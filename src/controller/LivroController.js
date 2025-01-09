import livro from '../models/Livro.js';
import { autor } from '../models/Autor.js';

class LivroController {

    static async listaLivros(req, res) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch (err) {
            res.status(500).json({message: `${err.message} - ERRO AO LISTAR LIVROS.`})
        }
    }

    static async listaLivroPorId(req, res) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);
        } catch (err) {
            res.status(500).json({message: `${err.message} - ERRO AO LISTAR LIVRO POR ID.`})
        }
    }

    static async criarLivro(req, res) {
        try {
            const novoLivro = req.body;
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCopiado = {...novoLivro, autor:{...autorEncontrado._doc}};
            const livroCriado = await livro.create(livroCopiado);
            res.status(201).json({message:"Livro criado com sucesso!", livro: livroCriado});
        } catch (err) {
            res.status(500).json({message: `${err.message} - ERRO AO CRIAR LIVRO`})
        }
    }

    static async atualizarLivro(req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Livro atualizado com sucesso!"});
        } catch (err) {
            res.status(500).json({message: `${err.message} - ERRO AO ATUALIZAR LIVRO`});
        }
    }

    static async deletarLivro(req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(204).json({message: "Livro deletado com sucesso!"});
        } catch (err) {
            res.status(500).json({message: `${err.message} - ERRO AO DELETAR LIVRO`})
        }
    }

    static async buscarLivrosPorEditora(req, res) {
        const editora = req.query.editor;
        try {
            const livrosPorEditora = await livro.find({editor: editora});
            res.status(200).json(livrosPorEditora);
        } catch (err) {
            res.status(500).json({message: `${err.message} - ERRO AO BUSCAR LIVROS POR EDITORA`});
        }
    }
};

export default LivroController;