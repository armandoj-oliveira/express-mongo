import NaoEncontrado from "../errors/NaoEncontrado.js";
import { autor, livro } from "../models/index.js";

class LivroController {
    static listarLivros = async (req, res, next) => {
        try {
            const buscarLivros = livro.find();
            req.resultado = buscarLivros;
            next();
        } catch (erro) {
            next(erro);
        }
    };

    static listarLivroPorId = async (req, res, next) => {
        try {
            const buscarLivro = await livro
                .findById(req.params.id)
                .populate("autor", "nome")
                .exec();

            if (!buscarLivro) {
                return next(new NaoEncontrado("Livro não encontrado."));
            }

            res.status(200).json(buscarLivro);
        } catch (erro) {
            next(erro);
        }
    };

    static listarLivroPorFiltro = async (req, res, next) => {
        try {
            const busca = await processaBusca(req.query);

            if(busca !== null) {
                const livrosResultado = livro
                    .find(busca)
                    .populate("autor");
                    
                req.resultado = livrosResultado;
    
                next()
            } else {
                res.status(200).send([]);
            }

        } catch (erro) {
            next(erro);
        }
    };

    static cadastrarLivro = async (req, res, next) => {
        try {
            const novoLivro = await livro.create(req.body);
            res.status(201).json({ message: "Livro cadastrado com sucesso!", livro: novoLivro });
        } catch (erro) {
            next(erro);
        }
    };

    static atualizarLivros = async (req, res, next) => {
        try {
            const livroAtualizado = await livro.findByIdAndUpdate(req.params.id, req.body, { new: true });

            if (!livroAtualizado) {
            return next(new NaoEncontrado("Livro não encontrado, impossibilitando a atualização dos dados."));
            }

            res.status(200).json({ message: "Livro atualizado com sucesso!", livro: livroAtualizado });
        } catch (erro) {
            next(erro);
        }
  };

    static deletarLivro = async (req, res, next) => {
        try {
        const livroExcluir = await livro.findByIdAndDelete(req.params.id);

        if (!livroExcluir) {
            return next(new NaoEncontrado("Livro não encontrado, impossibilitando a exclusão dos dados."));
        }

        res.status(200).json({ message: "Livro excluído com sucesso!" });
        } catch (erro) {
        next(erro);
        }
    };
}

async function processaBusca(params) {
    const { editora, titulo, nomeAutor, minPaginas, maxPaginas } = params;
    let busca = {};

    if (editora) busca.editora = editora;
    if (titulo) busca.titulo = new RegExp(titulo, "i");

    if (minPaginas || maxPaginas) {
        busca.paginas = {};
        if (minPaginas) busca.paginas.$gte = Number(minPaginas);
        if (maxPaginas) busca.paginas.$lte = Number(maxPaginas);
    }

    if (nomeAutor) {
        const autorEncontrado = await autor.findOne({ nome: nomeAutor }).exec();
        if (autorEncontrado) busca.autor = autorEncontrado._id;
    }

    return busca;
}

export default LivroController;