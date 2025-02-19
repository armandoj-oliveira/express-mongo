import express from 'express';
import conectaDatabase from './config/dbConnect.js';
import routes from './routes/index.js';

const conexao = await conectaDatabase();

conexao.on("error", (err) => {
    console.log("Erro de Conexão: ", err);
})

conexao.once("open", () => {
    console.log("Conectado");
})

const app = express();
routes(app);

export default app;