import "dotenv/config";
import app  from "./src/app.js";

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Iniciando servidor na porta ${PORT}`);
});
