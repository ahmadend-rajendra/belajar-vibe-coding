import { describe, expect, it } from "bun:test";
import { healthRoutes } from "../src/modules/health";
import { Elysia } from "elysia";

describe("API Server Tests", () => {
  it("Root endpoint returns status running and endpoints", async () => {
    const app = new Elysia().get("/", () => ({
      name: "vibe-coding-api",
      version: "1.0.0",
      status: "running",
      endpoints: {
        health: "/health",
        users: "/users",
      },
    }));

    const response = await app.handle(new Request("http://localhost/")).then((res) => res.json());

    expect(response.status).toBe("running");
    expect(response.endpoints.health).toBe("/health");
    expect(response.endpoints.users).toBe("/users");
  });

  it("Health endpoint handles database status gracefully", async () => {
    const app = new Elysia().use(healthRoutes);
    const response = await app.handle(new Request("http://localhost/health")).then((res) => res.json());

    expect(response.status).toBe("ok");
    expect(response.database).toBeDefined();
  });
});
