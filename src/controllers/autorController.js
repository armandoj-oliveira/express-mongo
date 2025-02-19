import { autor } from '../models/Autor.js';

class AutorController {

    static async listarAutores(req, res) {
        try {
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - falha na requisição!` });
        }
    }

    static async litarAutorPorId(req, res) {
        try {
            const buscarAutor = await autor.findById(req.params.id);
            if (!buscarAutor) {
                return res.status(404).json({ message: "Autor não encontrado!" });
            }
            res.status(200).json(buscarAutor);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição do autor!` });
        }
    }

    static async cadastrarAutor(req, res) {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({ message: "Autor cadastrado com sucesso!", autor: novoAutor });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha no cadastro do autor!` });
        }
    }

    static async atualizarAutor(req, res) {
        try {
            const autorAtualizado = await autor.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!autorAtualizado) {
                return res.status(404).json({ message: "Autor não encontrado!" });
            }
            res.status(200).json({ message: "Autor atualizado com sucesso!", autor: autorAtualizado });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao atualizar o autor!` });
        }
    }

    static async deletarAutor(req, res) {
        try {
            const autorDeletado = await autor.findByIdAndDelete(req.params.id);
            if (!autorDeletado) {
                return res.status(404).json({ message: "Autor não encontrado!" });
            }
            res.status(200).json({ message: "Autor excluído com sucesso!" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao excluir o autor!` });
        }
    }

}

export default AutorController;