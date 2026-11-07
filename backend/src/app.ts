import express from "express";
import cors from "cors";
import helmet from "helmet";

import { env } from "./configs/env";
import { appConfig } from "./configs/app.config";
import { apiRoute } from "./routes/routes";
import { errorMiddleware } from "./shared/middlewares/error.middleware";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(appConfig.apiPrefix,apiRoute)




app.get("/", (_req, res) => {
  res.send("Click Backend API is running 🚀" + `${env.PORT}`);
});





// manage error
app.use(errorMiddleware);
export default app;
