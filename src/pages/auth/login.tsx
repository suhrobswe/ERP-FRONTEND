"use client";

import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PasswordInput } from "@/components/ui/password-input";
import { Spinner } from "@/components/ui/spinner";
import { useLogin } from "./service/useLogin";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
    role: z.string().min(2).max(50),
});

export const Login = () => {
    const { mutate, isPending } = useLogin();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "Admin1",
            password: "Admin1!",
            role: "Admin",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        mutate(data, {
            onSuccess: (res) => {
                Cookies.set("token", res.data.token);
                Cookies.set("role", res.data.user.role.toLowerCase());

                toast.success(res.message.uz, {
                    position: "bottom-right",
                });

                navigate(`/app/${res.data.user.role.toLowerCase()}`);
            },
            onError: (error) => console.log(`error on login page: ${error}`),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f1115] px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-white">
                        CRM<span className="text-blue-500">.</span>
                    </h1>
                    <p className="text-gray-400 text-sm mt-2">
                        Sign in to continue
                    </p>
                </div>

                <div className="bg-[#1b1e23] border border-gray-800 rounded-xl p-8 shadow-xl">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-5"
                        >
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-300 text-sm">
                                            Role
                                        </FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className="bg-[#0f1115] border-gray-700 text-white">
                                                    <SelectValue placeholder="Select role" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#181b1f] text-white">
                                                    <SelectItem value="Admin">
                                                        Admin
                                                    </SelectItem>
                                                    <SelectItem value="Teacher">
                                                        Teacher
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-300 text-sm">
                                            Username
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Username"
                                                className="bg-[#0f1115] border-gray-700 text-white"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-300 text-sm">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                placeholder="Password"
                                                className="bg-[#0f1115] border-gray-700 text-white"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                {isPending && (
                                    <Spinner className="w-4 h-4 mr-2" />
                                )}
                                {isPending ? "Signing in..." : "Sign In"}
                            </Button>
                        </form>
                    </Form>
                </div>

                <p className="text-center text-xs text-gray-500 mt-6">
                    © {new Date().getFullYear()} CEO of CRM — Suhrob
                    Abdurazzokov & Founder Dinmuhammad
                </p>
            </div>
        </div>
    );
};
