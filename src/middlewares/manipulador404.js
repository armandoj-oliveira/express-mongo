import NaoEncontrado from "../errors/NaoEncontrado.js";

function manipulador404(req, res, next) {
    next(new NaoEncontrado());
}

export default manipulador404;