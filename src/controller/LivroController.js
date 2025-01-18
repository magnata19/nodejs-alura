import { autor, livro } from "../models/index.js";

class LivroController {
  static async listaLivros(req, res, next) {
    try {
      const buscaLivro = livro.find();
      req.resultado = buscaLivro; 
      next();
    } catch (err) {
      next(err);
    }
  }

  static async listaLivroPorId(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      if (livroEncontrado !== null) {
        res.status(200).json(livroEncontrado);
      } else {
        res.status(404).json({ message: "Erro ao listar livro por id." });
      }
    } catch (err) {
      next(err);
    }
  }

  static async criarLivro(req, res, next) {
    try {
      const novoLivro = req.body;
      const autorEncontrado = await autor.findById(novoLivro.autor);
      if (!autorEncontrado) {
        res.status(400).json({ message: "Autor não encontrado." });
        return;
      }
      const livroCopiado = { ...novoLivro, autor: { ...autorEncontrado._doc } };
      const livroCriado = await livro.create(livroCopiado);
      res
        .status(201)
        .json({ message: "Livro criado com sucesso!", livro: livroCriado });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async atualizarLivro(req, res, next) {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Livro atualizado com sucesso!" });
    } catch (err) {
      next(err);
    }
  }

  static async deletarLivro(req, res, next) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(204).json({ message: "Livro deletado com sucesso!" });
    } catch (err) {
      next(err);
    }
  }

  static async buscarLivroPorFiltro(req, res, next) {
    try {
      const busca = await buscaPorParametros(req.query);
      if(busca !== null) {
        const livrosPorEditora = await livro.find(busca);
        res.status(200).json(livrosPorEditora);
      } else {
        res.status(200).send([]);
      }
    } catch (err) {
      next(err);
    }
  }
}

const buscaPorParametros = async (parametro) => {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametro;
  let busca = {};
  if (editora) busca.editora = { $regex: editora, $options: "i" };
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
  if (minPaginas) busca.paginas = { $gte: minPaginas };
  if (maxPaginas) busca.paginas = { $lte: maxPaginas };
  
  if(nomeAutor) {
    const autorEncontrado = await autor.findOne({nome: nomeAutor});
    if(autorEncontrado !== null) {
      const autorNome = autorEncontrado._id;
      busca['autor._id'] = autorNome;
    } else {
      busca = null;
    }
  }

  return busca;
};

export default LivroController;
