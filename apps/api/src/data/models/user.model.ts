import { DatabaseError } from "@/errors/index.js";
import { prisma, type User } from "@/lib/prisma.js";

export type { User } from "@/lib/prisma.js";

type UserBase = Pick<User, "name" | "email">;

/**
 * Creates a new unique user.
 * @param userDetails name, email
 * @returns new user
 */
export async function createUser(userDetails: UserBase): Promise<User> {
  try {
    const createdUser = await prisma.user.create({ data: userDetails });
    return createdUser;
  } catch (error) {
    throw new DatabaseError({
      message: "Unable to create a user with the provided user details.",
      metadata: { query: "prisma.user.create()" },
      opts: { cause: error },
    });
  }
}
