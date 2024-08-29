"use server"
import { signupSchema } from "@/lib/validationSchema";
import { z } from "zod";
import prisma from "../../../prisma/Client";

export const createUser = async (data: z.infer<typeof signupSchema>) => {
    try {
        const validatedUser = signupSchema.parse(data)
        const { email, password } = validatedUser

        const userExists = await prisma.users.findFirst({ where: { email } })

        if (userExists) {
            throw new Error("User already exists.")
        }

        await prisma.users.create({ data: { email, password } })
        return { success: true }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return { error: errorMessage }
    }
}