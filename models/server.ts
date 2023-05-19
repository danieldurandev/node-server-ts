import express, { Application } from "express";
import userRoutes from "../routes/usuarios";
import cors from "cors";
import db from "../db/connection";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    usuarios: "/api/usuarios",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    this.routes();
    this.dbConnection();
    this.middlewares();
  }

  async dbConnection() {
    try {
      await db.sync({ force: false });
      console.log("Database online");
    } catch (error) {
      console.log(error);
      throw new Error("Fallo la conexion con la Base de Datos");
    }
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiPaths.usuarios, userRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Sevidor corriendo en puerto ", this.port);
    });
  }
}

export default Server;
