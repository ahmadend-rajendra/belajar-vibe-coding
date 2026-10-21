import { Elysia } from "elysia";
import { healthRoutes } from "./modules/health";
import { userRoutes } from "./modules/users";

const port = Number(process.env.PORT) || 3000;

const app = new Elysia()
  .get("/", () => ({
    name: "vibe-coding-api",
    version: "1.0.0",
    status: "running",
    endpoints: {
      health: "/health",
      users: "/users",
    },
  }))
  .use(healthRoutes)
  .use(userRoutes)
  .listen(port);

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);

export type App = typeof app;
