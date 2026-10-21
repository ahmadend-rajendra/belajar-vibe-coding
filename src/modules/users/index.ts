import { Elysia, t } from "elysia";
import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

export const userRoutes = new Elysia({ prefix: "/users" })
  .get("/", async () => {
    const allUsers = await db.select().from(users);
    return {
      success: true,
      data: allUsers,
    };
  })
  .get(
    "/:id",
    async ({ params, set }) => {
      const result = await db
        .select()
        .from(users)
        .where(eq(users.id, Number(params.id)))
        .limit(1);

      if (result.length === 0) {
        set.status = 404;
        return { success: false, message: "User not found" };
      }

      return {
        success: true,
        data: result[0],
      };
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .post(
    "/",
    async ({ body, set }) => {
      try {
        const [result] = await db.insert(users).values({
          name: body.name,
          email: body.email,
        });

        set.status = 201;
        return {
          success: true,
          message: "User created successfully",
          data: {
            id: result.insertId,
            name: body.name,
            email: body.email,
          },
        };
      } catch (error: any) {
        set.status = 400;
        return {
          success: false,
          message: error.message || "Failed to create user",
        };
      }
    },
    {
      body: t.Object({
        name: t.String({ minLength: 1 }),
        email: t.String({ format: "email" }),
      }),
    }
  )
  .delete(
    "/:id",
    async ({ params, set }) => {
      try {
        await db.delete(users).where(eq(users.id, Number(params.id)));
        return {
          success: true,
          message: "User deleted successfully",
        };
      } catch (error: any) {
        set.status = 400;
        return {
          success: false,
          message: error.message || "Failed to delete user",
        };
      }
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  );
