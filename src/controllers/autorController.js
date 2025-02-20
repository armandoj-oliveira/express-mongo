import NaoEncontrado from "../errors/NaoEncontrado.js";
import { autor } from "../models/index.js";

class AutorController {
    static listarAutores = async (req, res, next) => {
    try {
        const listaAutores = autor.find();
        req.resultado = listaAutores;
        next();
    } catch (erro) {
        next(erro);
    }
    };

    static listarAutorPorId = async (req, res, next) => {
        try {
            const { id } = req.params;
            const autorResultado = await autor.findById(id).exec();

            if (!autorResultado) {
                return next(new NaoEncontrado("Autor não encontrado!"));
            }

            res.status(200).json(autorResultado);
        } catch (erro) {
            next(erro);
        }
    };

    static cadastrarAutor = async (req, res, next) => {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({ message: "Autor cadastrado com sucesso!", autor: novoAutor });
        } catch (erro) {
            next(erro);
        }
    };

    static atualizarAutor = async (req, res, next) => {
        try {
            const autorAtualizado = await autor.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();

            if (!autorAtualizado) {
                return next(new NaoEncontrado("Autor não localizado, impossibilitando a atualização dos dados."));
            }

            res.status(200).json({ message: "Autor atualizado com sucesso!", autor: autorAtualizado });
        } catch (erro) {
            next(erro);
        }
    };

    static deletarAutor = async (req, res, next) => {
        try {
            const autorExcluir = await autor.findByIdAndDelete(req.params.id).exec();

            if (!autorExcluir) {
                return next(new NaoEncontrado("Autor não localizado, impossibilitando a sua exclusão."));
            }

            res.status(200).json({ message: "Autor excluído com sucesso!" });
        } catch (erro) {
            next(erro);
        }
    };
}

export default AutorController;