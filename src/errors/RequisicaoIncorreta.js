import ErroBase from "./ErroBase.js";

class RequisicaoIncorreta extends ErroBase {
    constructor(mensagem = "Um ou mais dados estão sendo fornecidos incorretamente.") {
        super(mensagem, 400);
    }
}

export default RequisicaoIncorreta;