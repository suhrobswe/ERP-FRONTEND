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
    username: z.string().min(2, "Min 2 chars").max(50),
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
                username: defaultValueData.data.username,
                name: defaultValueData.data.name,
                specification: specs,
            });
        }
    }, [defaultValueData]);

    const client = useQueryClient();
    const { mutate, isPending } = useCreateTeacher();
    const { mutate: editMutate, isPending: editIsPending } = useEditTeacher(
        teacherId as string
    );

    const { data: specificationData, isLoading } = useSpecification() as {
        data: { data: { id: number; name: string }[] };
        isLoading: boolean;
    };

    const onSubmit = (data: TeacherFormInput) => {
        if (defaultValueData) {
            return editMutate(data, {
                onSuccess: (res) => {
                    toast.success(res.message.uz);
                    client.invalidateQueries({ queryKey: ["teacher_list"] });
                    closeModal?.();
                },
                onError: () => toast.error("Error updating!"),
            });
        }

        mutate(data, {
            onSuccess: (res) => {
                toast.success(res.message.en);
                client.invalidateQueries({ queryKey: ["teacher_list"] });
                form.reset();
                closeModal?.();
            },
            onError: () => toast.error("Xatolik!"),
        });
    };

    const specifications = specificationData?.data || [];
    const selectedSpecs = form.watch("specification");

    const selectedSpecsText = selectedSpecs
        .map(
            (id) => specifications.find((spec) => String(spec.id) === id)?.name
        )
        .filter(Boolean)
        .join(", ");

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 p-8 bg-white border rounded-xl shadow-lg"
            >
                <FormField
                    control={form.control}
                    name="specification"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Specifications</FormLabel>

                            {isLoading ? (
                                <p>Loading...</p>
                            ) : (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-between"
                                        >
                                            {selectedSpecs.length
                                                ? selectedSpecsText
                                                : "Select Specifications..."}
                                            <ChevronDown size={16} />
                                        </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent className="max-h-60 overflow-y-auto">
                                        {specifications.map((spec) => {
                                            const value = String(spec.id);
                                            const checked =
                                                field.value.includes(value);

                                            return (
                                                <DropdownMenuCheckboxItem
                                                    key={spec.id}
                                                    checked={checked}
                                                    onCheckedChange={(
                                                        state
                                                    ) => {
                                                        if (state)
                                                            field.onChange([
                                                                ...field.value,
                                                                value,
                                                            ]);
                                                        else
                                                            field.onChange(
                                                                field.value.filter(
                                                                    (v) =>
                                                                        v !==
                                                                        value
                                                                )
                                                            );
                                                    }}
                                                >
                                                    {spec.name}
                                                    {checked && (
                                                        <Check size={14} />
                                                    )}
                                                </DropdownMenuCheckboxItem>
                                            );
                                        })}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Username..." />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Full name..." />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {!defaultValueData && (
                    <FormField
                        name="password"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <PasswordInput
                                    {...field}
                                    placeholder="Password"
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <Button type="submit" className="w-full">
                    {(isPending || editIsPending) && <Spinner />}{" "}
                    {defaultValueData ? "Update" : "Submit"}
                </Button>
            </form>
        </Form>
    );
};
