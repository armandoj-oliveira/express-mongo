import livro from '../models/Livro.js';
import { autor } from '../models/Autor.js';

class LivroController {

    static async listarLivros(req, res) {
        try {
            const listaLivros = await livro.find({}).populate("autor").exec();
            res.status(200).json(listaLivros);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição` });
        }
    };

    static async litarLivrosPorId(req, res) {
        try {
            const buscarLivro = await livro.findById(req.params.id);
            if (!buscarLivro) {
                return res.status(404).json({ message: "Livro não encontrado!" });
            }
            res.status(200).json(buscarLivro);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição do livro!` });
        }
    }

    static async cadastrarLivro(req, res) {
        try {
            const autorEncontrado = await autor.findById(req.body.autor);
            if (!autorEncontrado) {
                return res.status(400).json({ message: "Autor não encontrado!" });
            }

            const novoLivro = await livro.create(req.body);
            res.status(201).json({ message: "Livro cadastrado com sucesso!", livro: novoLivro });

        } catch (erro) {
            res.status(400).json({ message: `${erro.message} - falha no cadastro do livro!` });
        }
    }

    static async atualizarLivros(req, res) {
        try {
            const livroAtualizado = await livro.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!livroAtualizado) {
                return res.status(404).json({ message: "Livro não encontrado!" });
            }
            res.status(200).json({ message: "Livro atualizado com sucesso!", livro: livroAtualizado });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao atualizar o livro!` });
        }
    }

    static async deletarLivro(req, res) {
        try {
            const livroDeletado = await livro.findByIdAndDelete(req.params.id);
            if (!livroDeletado) {
                return res.status(404).json({ message: "Livro não encontrado!" });
            }
            res.status(200).json({ message: "Livro excluído com sucesso!" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao excluir o livro!` });
        }
    }
}

export default LivroController;