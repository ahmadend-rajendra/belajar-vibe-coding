import { Elysia } from "elysia";
import { poolConnection } from "../../db";

export const healthRoutes = new Elysia({ prefix: "/health" })
  .get("/", async () => {
    let dbStatus = "disconnected";
    try {
      const conn = await poolConnection.getConnection();
      await conn.ping();
      conn.release();
      dbStatus = "connected";
    } catch {
      dbStatus = "unavailable";
    }

    return {
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: dbStatus,
    };
  });
