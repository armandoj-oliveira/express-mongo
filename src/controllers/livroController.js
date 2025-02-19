import livro from '../models/Livro.js';

class LivroController {

    static async listarLivros(req, res) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - falha na requisição!` });
        }
    }

    static async litarLivrosPorId(req, res) {
        try {
            const bucarLivro = await livro.findById(req.params.id);
            res.status(200).json(bucarLivro);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição do livro!` })
        }
    }

    static async cadastrarLivro(req, res) {
        try {
            const novoLivro = await livro.create(req.body);
            res.status(201).json({ message: "Livro cadastrado com sucesso!", livro: novoLivro});
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha no cadastro do livro!` });
        }
    }

    static async atualizarLivros(req, res) {
        try {
            await livro.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({ message: "Livro atualizar com sucesso!" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao atualizar o livro!` })
        }
    }

    static async deletarLivro(req, res) {
        try{
            await livro.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Livro excluído com sucesso!" });
        } catch (erro) {
            res.status(500).json({ messagem: `${erro.message} - falha ao excluir o livro!` })
        }
    }

}

export default LivroController;