import livro from '../models/Livro.js';
import { autor } from '../models/Autor.js';

class LivroController {

    static listarLivros = async (req, res, next) => {
        try {
            const listaLivros = await livro.find({}).populate("autor").exec();
            res.status(200).json(listaLivros);
        } catch (erro) {
            next(erro);
        }
    };

    static litarLivrosPorId = async (req, res, next) => {
        try {
            const buscarLivro = await livro.findById(req.params.id);

            if (!buscarLivro) {
                return res.status(404).json({ message: "Livro não encontrado!" });
            }

            res.status(200).json(buscarLivro);
        } catch (erro) {
            next(erro);
        }
    }

    static listarLivroPorEditora = async (req, res, next) => {
        try {
            const editora = req.query.editora;
            const livrosResultado = await livro.find({ editora: editora });
            res.status(200).json(livrosResultado);
        } catch (erro) {
            next(erro);
        }
    }

    static cadastrarLivro = async (req, res, erro) => {
        try {
            const autorEncontrado = await autor.findById(req.body.autor);

            if (!autorEncontrado) {
                return res.status(400).json({ message: "Autor não encontrado!" });
            }

            const novoLivro = await livro.create(req.body);
            res.status(201).json({ message: "Livro cadastrado com sucesso!", livro: novoLivro });

        } catch (erro) {
            next(erro);
        }
    }

    static atualizarLivros = async (req, res, erro) => {
        try {
            const livroAtualizado = await livro.findByIdAndUpdate(req.params.id, req.body, { new: true });

            if (!livroAtualizado) {
                return res.status(404).json({ message: "Livro não encontrado!" });
            }

            res.status(200).json({ message: "Livro atualizado com sucesso!", livro: livroAtualizado });
        } catch (erro) {
            next(erro);
        }
    }

    static deletarLivro = async (req, res, next) => {
        try {
            const livroDeletado = await livro.findByIdAndDelete(req.params.id);

            if (!livroDeletado) {
                return res.status(404).json({ message: "Livro não encontrado!" });
            }

            res.status(200).json({ message: "Livro excluído com sucesso!" });
        } catch (erro) {
            next(erro);
        }
    }
}

export default LivroController;