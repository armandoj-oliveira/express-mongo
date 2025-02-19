import express from 'express';
import conectaDatabase from './config/dbConnect.js';
import routes from './routes/index.js';
import manipuladorDeErros from './middlewares/manipuladorDeErros.js';

const conexao = await conectaDatabase();

conexao.on("error", (err) => {
    console.log("Erro de Conexão: ", err);
})

conexao.once("open", () => {
    console.log("Conectado");
})

const app = express();
routes(app);

app.use(manipuladorDeErros)

export default app;