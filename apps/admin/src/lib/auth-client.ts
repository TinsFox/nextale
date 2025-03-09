import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: "http://localhost:2111",
});

export const { signIn, signUp, useSession } = createAuthClient();
export type Session = typeof authClient.$Infer.Session;
