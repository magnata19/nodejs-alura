import livro from '../models/Livro.js';

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
            const novoLivro = await livro.create(req.body);
            res.status(201).json({message:"Livro criado com sucesso!", novoLivro});
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
};

export default LivroController;