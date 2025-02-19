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
            const bucarAutor = await autor.findById(req.params.id);
            res.status(200).json(bucarAutor);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição do autor!` })
        }
    }

    static async cadastrarAutor(req, res) {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({ message: "Autor cadastrado com sucesso!", autor: novoAutor});
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha no cadastro do autor!` });
        }
    }

    static async atualizarAutor(req, res) {
        try {
            await autor.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({ message: "Autor atualizado com sucesso!" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao atualizar o autor!` })
        }
    }

    static async deletarAutor(req, res) {
        try{
            await autor.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Autor excluído com sucesso!" });
        } catch (erro) {
            res.status(500).json({ messagem: `${erro.message} - falha ao excluir o autor!` })
        }
    }

}

export default AutorController;