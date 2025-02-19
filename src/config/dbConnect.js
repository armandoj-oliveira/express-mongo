import mongoose from 'mongoose';

async function conectaDatabse() {
    try {
        mongoose.connect(process.env.DB_CONNECTION_STRING);

        console.log("Conectado ao MongoDB...");
        return mongoose.connection;
    } catch (error) {
        console.log("Erro ao conectar ao MongoDB: ", error);
    }
}

export default conectaDatabse;