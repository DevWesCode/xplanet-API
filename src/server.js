import dotenv from "dotenv";
dotenv.config();

import app from "./app";

app.listen(3001, () => console.log("Server rodando na porta 3001..."));
