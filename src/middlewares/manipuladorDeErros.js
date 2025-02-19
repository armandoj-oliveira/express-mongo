import mongoose from "mongoose";

function manipuladorDeErros(erro, req, res, next) {

    if (erro instanceof mongoose.Error.CastError) {

        res.status(400).send({ message: "Um ou mais dados estao sendo fornecidos incorretamente." });

    } else if (erro instanceof mongoose.Error.ValidationError) {

        const mensagemErro = Object.values(erro.errors)
            .map((erro) => erro.message)
            .join("; ");

        res.status(400).send({ message: `Os seguintes erros foram encontrados: ${mensagemErro}` });

    } else {

        res.status(500).json({ message: "Erro interno do servidor." });
    }
}

export default manipuladorDeErros;