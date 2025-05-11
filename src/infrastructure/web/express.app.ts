import express, { Express } from "express";
import cors from "cors";
import { mainRouter } from "./routes";
import { globalErrorHandler } from "./middleware/error-handler.middleware";

export function createApp(): Express {
  const app: Express = express();

  app.use(cors());

  app.use(
    express.text({
      type: ["application/xml", "text/xml"],
      limit: "10mb",
    })
  );

  app.use(express.json());
  app.use(mainRouter);
  app.use(globalErrorHandler);

  return app;
}
