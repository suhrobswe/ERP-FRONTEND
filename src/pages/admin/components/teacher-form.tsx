"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateTeacher } from "../service/mutation/useCreateTeacher";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useSpecification } from "../service/query/useSpecification";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Check } from "lucide-react";
import type { FormProps } from "../type";
import { useEditTeacher } from "../service/mutation/useEditTeacher";
import { Spinner } from "@/components/ui/spinner";
import React from "react";

const formSchema = z.object({
    username: z.string().min(2, "Minimum 2 characters").max(50),
    password: z.string().optional(),
    name: z.string().min(2).max(50),
    specification: z.array(z.string()).min(1, "Select at least one"),
});

type TeacherFormInput = z.infer<typeof formSchema>;

export const TeacherForm = ({
    closeModal,
    defaultValueData,
    teacherId,
}: FormProps) => {
    const form = useForm<TeacherFormInput>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            name: "",
            specification: [],
        },
    });

    React.useEffect(() => {
        if (defaultValueData?.data) {
            const specs = Array.isArray(defaultValueData.data.specification)
                ? defaultValueData.data.specification.map((s: any) =>
                      String(s.id)
                  )
                : [];
            form.reset({
                username: defaultValueData.data.username || "",
                name: defaultValueData.data.name || "",
                specification: specs,
            });
        }
    }, [defaultValueData, form]);

    const client = useQueryClient();
    const { mutate, isPending } = useCreateTeacher();
    const { mutate: editMutate, isPending: editIsPending } = useEditTeacher(
        teacherId as string
    );

    const { data: specificationData, isLoading } = useSpecification();
    const specs = specificationData?.data || [];

    const onSubmit = (data: TeacherFormInput) => {
        if (defaultValueData) {
            return editMutate(data, {
                onSuccess: (res) => {
                    toast.success(res.message.en);
                    client.invalidateQueries({ queryKey: ["teacher_list"] });
                    closeModal?.();
                },
                onError: () => toast.error("Something went wrong!"),
            });
        }

        mutate(data, {
            onSuccess: (res) => {
                toast.success(res.message.en);
                client.invalidateQueries({ queryKey: ["teacher_list"] });
                form.reset();
                closeModal?.();
            },
            onError: () => toast.error("Error creating teacher!"),
        });
    };

    const selectedSpecs = form.watch("specification");
    const selectedText = selectedSpecs
        .map((id) => specs.find((s) => String(s.id) === id)?.name)
        .filter(Boolean)
        .join(", ");

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5 p-8 rounded-xl bg-gradient-to-br from-slate-900/60 to-black/40 border border-gray-700 backdrop-blur-lg shadow-xl"
            >
                {/* Specifications */}
                <FormField
                    control={form.control}
                    name="specification"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-200 font-semibold">
                                Specification
                            </FormLabel>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-between text-gray-200 bg-black/30 border-gray-700 hover:bg-gray-800 transition-all"
                                    >
                                        {selectedSpecs.length
                                            ? selectedText
                                            : "Select..."}
                                        <ChevronDown size={16} />
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="max-h-56 overflow-y-auto bg-gray-900/95 border-gray-700 backdrop-blur-md rounded-lg shadow-lg">
                                    {isLoading ? (
                                        <div className="p-3 text-gray-400">
                                            Loading...
                                        </div>
                                    ) : (
                                        specs.map((spec) => {
                                            const value = String(spec.id);
                                            const checked =
                                                field.value.includes(value);

                                            return (
                                                <DropdownMenuCheckboxItem
                                                    key={spec.id}
                                                    checked={checked}
                                                    onCheckedChange={(state) =>
                                                        field.onChange(
                                                            state
                                                                ? [
                                                                      ...field.value,
                                                                      value,
                                                                  ]
                                                                : field.value.filter(
                                                                      (v) =>
                                                                          v !==
                                                                          value
                                                                  )
                                                        )
                                                    }
                                                    className="text-gray-200 hover:bg-gray-800 flex justify-between"
                                                >
                                                    {spec.name}
                                                    {checked && (
                                                        <Check size={14} />
                                                    )}
                                                </DropdownMenuCheckboxItem>
                                            );
                                        })
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <FormMessage className="text-red-400" />
                        </FormItem>
                    )}
                />

                {/* Username */}
                <FormField
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-200 font-semibold">
                                Username
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter username..."
                                    className="bg-black/40 border-gray-700 text-white placeholder-gray-400 focus:ring-cyan-500"
                                />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                        </FormItem>
                    )}
                />

                {/* Full Name */}
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-200 font-semibold">
                                Full Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter full name..."
                                    className="bg-black/40 border-gray-700 text-white focus:ring-cyan-500 placeholder-gray-400"
                                />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                        </FormItem>
                    )}
                />

                {/* Password for Create only */}
                {!defaultValueData && (
                    <FormField
                        name="password"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-200 font-semibold">
                                    Password
                                </FormLabel>
                                <PasswordInput
                                    {...field}
                                    placeholder="Password..."
                                    className="bg-black/40 border-gray-700 text-white placeholder-gray-400 focus:ring-cyan-500"
                                />
                                <FormMessage className="text-red-400" />
                            </FormItem>
                        )}
                    />
                )}

                <Button
                    type="submit"
                    className="w-full mt-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-200 flex justify-center items-center gap-2"
                >
                    {(isPending || editIsPending) && <Spinner />}
                    {defaultValueData ? "Update Teacher" : "Create Teacher"}
                </Button>
            </form>
        </Form>
    );
};
