import mongoose from 'mongoose';

const livroSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId
    },
    titulo: {
        type: String,
        required: [true, "O titulo do livro o obrigatório."]
    },
    editora: {
        type: String,
        required: [true, "A editora do livro o obrigatória."],
        enum: {
            values: ["Pe de Letra", "Veríssimo", "Geektopia", "Panini Comics", "Marvel Comics", "DC Comics", "Arquiero"],
            message: "A editora {VALUE} não é um valor permitido."
        }
    },
    preco: {
        type: Number
    },
    paginas: {
        type: Number,
        validate: {
            validator: (valor) => {
                return valor >= 10 && valor <= 2000;
            },
            message: "O número de página necessita estar entre 20 a 2000 páginas. O valor fornecido foi: {VALUE}."
        }
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId, ref: 'autores',
        required: [true, "O(a) autor(a) é obrigatório(a)."]
    },
}, { versionKey: false });

const livro = mongoose.model("Livro", livroSchema); 

export default livro; 