import { env } from "@/env";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: env.NEXT_PUBLIC_API_URL,
	storageKey: "auth",
});

export const { signIn, signUp, useSession } = createAuthClient();
