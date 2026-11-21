import "reflect-metadata";
import { createServer } from "node:http";
import app from "./app";
import { env } from "./configs/env";
import { AppDataSource } from "./databases/data-source";
// import { initializeSocket } from "./support/socketio/socket";

async function bootstrap() {
  try {
    await AppDataSource.initialize();

    console.log("Database connected successfully ✅");

    const httpServer = createServer(app);

    // initializeSocket(httpServer);

    httpServer.listen(env.PORT, () => {
      console.log(`Server is running on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

bootstrap();
