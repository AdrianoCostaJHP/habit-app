import { appRoutes } from "./routes/routes";
import Fastify from "fastify";
import cors from "@fastify/cors";

const app = Fastify();

app.register(cors, {
  origin: true
});
app.register(appRoutes);

app
  .listen({ port: 6565, host: "0.0.0.0" })
  .then(() => console.log("Server running in http://localhost:6565"));
