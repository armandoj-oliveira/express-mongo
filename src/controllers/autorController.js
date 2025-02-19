import { autor } from '../models/Autor.js';

class AutorController {

    static listarAutores = async (req, res, next) => {
        try {
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
        } catch (erro) {
            next(erro);
        }
    }

    static listarAutorPorId = async (req, res, next) => {
        try {
            const buscarAutor = await autor.findById(req.params.id);

            if (!buscarAutor) {
                return res.status(404).json({ message: "Autor não encontrado!" });
            }

            res.status(200).json(buscarAutor);
        } catch (erro) {
            next(erro);
        }
    }

    static cadastrarAutor = async (req, res, next) => {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({ message: "Autor cadastrado com sucesso!", autor: novoAutor });
        } catch (erro) {
            next(erro);
        }
    }

    static atualizarAutor = async (req, res, next) => {
        try {
            const autorAtualizado = await autor.findByIdAndUpdate(req.params.id, req.body, { new: true });

            if (!autorAtualizado) {
                return res.status(404).json({ message: "Autor não encontrado!" });
            }

            res.status(200).json({ message: "Autor atualizado com sucesso!", autor: autorAtualizado });
        } catch (erro) {
            next(erro);
        }
    }

    static deletarAutor = async (req, res, next) => {
        try {
            const autorDeletado = await autor.findByIdAndDelete(req.params.id);

            if (!autorDeletado) {
                return res.status(404).json({ message: "Autor não encontrado!" });
            }

            res.status(200).json({ message: "Autor excluído com sucesso!" });
        } catch (erro) {
            next(erro);
        }
    }

}

export default AutorController;