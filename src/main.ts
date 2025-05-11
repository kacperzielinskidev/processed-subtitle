import { createApp } from "./infrastructure/web/express.app";

const PORT: number = parseInt(process.env.PORT || "3000", 10);

async function bootstrap() {
  const app = createApp();

  app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
    console.log(
      `To test POST, send XML to: POST http://localhost:${PORT}/api/subtitles`
    );
    console.log(
      `To test GET, use: GET http://localhost:${PORT}/api/subtitles?videoId=your_video_id&lang=your_lang`
    );
    console.log("Use 'npm run dev' to run in development mode.");
  });
}

bootstrap().catch((err) => {
  console.error("Failed to bootstrap the application:", err);
  process.exit(1);
});
