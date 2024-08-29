"use server"

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { rateLimit } from "./utils/rateLimit";

export const Login = async ({ name }: { name: string | null }) => {
    console.log(rateLimit());
}