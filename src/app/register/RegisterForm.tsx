"use client"

import { signupSchema } from "@/lib/validationSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { createUser } from "../actions/users.actions";
import { toast } from "@/components/ui/use-toast"

type FormData = z.infer<typeof signupSchema>;

const RegisterForm = () => {

    const form = useForm<FormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "asdasdasd@gmail.com",
            password: "asdasdasd@gmail.com",
            confirmPassword: "asdasdasd@gmail.com",
            terms: true,
        }
    })

    const { register, handleSubmit, formState: { errors } } = form;

    const onSubmit = async (data: FormData) => {
        const res = await createUser(data);
        if (res.success) {
            return toast({
                title: "User created successfully.",
                description: new Date().toString()
            })
        }
        toast({
            title: res.error,
            description: new Date().toString()
        })
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="name@company.com"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                    type="password"
                    id="password"
                    {...register("password")}
                    className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="••••••••"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    {...register("confirmPassword")}
                    className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="••••••••"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>
            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input
                        id="terms"
                        type="checkbox"
                        {...register("terms")}
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600"
                    />
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                        I agree to the terms and conditions
                    </label>
                    {errors.terms && <p className="text-red-500 text-sm">{errors.terms.message}</p>}

                </div>
            </div>
            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
            <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400">
                Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
            </p>

        </form>
    )
}

export default RegisterForm