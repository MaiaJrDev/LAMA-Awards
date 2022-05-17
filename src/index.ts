import dotenv from "dotenv";
import { AddressInfo } from "net";
import express from "express";
import { userRouter } from "./routes/userRouter";
import { bandRouter } from "./routes/bandRouter";
import cors from 'cors';
import { showRouter } from "./routes/showRouter";
import { ticketRouter } from "./routes/ticketRouter";
import { photoRouter } from "./routes/photoRouter";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/band", bandRouter);
app.use("/show", showRouter);
app.use("/ticket", ticketRouter);
app.use("/photo", photoRouter);

const server = app.listen(process.env.PORT || 3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});
