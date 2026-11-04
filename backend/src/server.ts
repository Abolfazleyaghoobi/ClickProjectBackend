
import "reflect-metadata";
import app from "./app";
import { env } from "./configs/env";
import { AppDataSource } from "./databases/data-source";

async function bootstrap() {
  try {
    await AppDataSource.initialize();

    console.log("Database connected successfully ✅");

    app.listen(env.PORT, () => {
      console.log(
        `Server is running on http://localhost:${env.PORT}`,
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

bootstrap();
