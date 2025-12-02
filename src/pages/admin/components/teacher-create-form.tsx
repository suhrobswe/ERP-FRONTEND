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

const formSchema = z.object({
    username: z.string().min(2, "Min 2 chars").max(50),
    password: z.string().min(2, "Min 2 chars"),
    name: z.string().min(2).max(50),
    specification: z
        .array(z.string())
        .min(1, "Select at least one specification"),
});

type TeacherFormInput = z.infer<typeof formSchema>;

export const TeacherForm = ({ closeModal }: { closeModal?: () => void }) => {
    const form = useForm<TeacherFormInput>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            name: "",
            specification: [],
        },
    });

    const client = useQueryClient();
    const { mutate, isPending } = useCreateTeacher();
    const { data: specificationData, isLoading } = useSpecification() as {
        data: { data: { id: number; name: string }[] };
        isLoading: boolean;
    };

    const onSubmit = (data: TeacherFormInput) => {
        mutate(data, {
            onSuccess: () => {
                toast.success("Teacher yaratildi!");
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
                className="space-y-6 p-8 bg-white border border-gray-200 rounded-xl shadow-lg"
            >
                <FormField
                    control={form.control}
                    name="specification"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-gray-700">
                                Specifications
                            </FormLabel>

                            {isLoading ? (
                                <p className="text-sm text-gray-500 italic">
                                    Loading specifications...
                                </p>
                            ) : (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-between font-normal text-left"
                                        >
                                            {selectedSpecs.length === 0
                                                ? "Select Specifications..."
                                                : selectedSpecsText}
                                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent
                                        className="w-full p-2 max-h-60 overflow-y-auto"
                                        align="start"
                                    >
                                        {specifications.map((spec) => {
                                            const specIdString = String(
                                                spec.id
                                            );
                                            const isChecked =
                                                field.value.includes(
                                                    specIdString
                                                );

                                            return (
                                                <DropdownMenuCheckboxItem
                                                    key={spec.id}
                                                    checked={isChecked}
                                                    onCheckedChange={(
                                                        checked
                                                    ) => {
                                                        const updated = checked
                                                            ? [
                                                                  ...field.value,
                                                                  specIdString,
                                                              ]
                                                            : field.value.filter(
                                                                  (id) =>
                                                                      id !==
                                                                      specIdString
                                                              );

                                                        field.onChange(updated);
                                                    }}
                                                    className="cursor-pointer flex justify-between items-center"
                                                >
                                                    {spec.name}
                                                    {isChecked && (
                                                        <Check className="h-4 w-4 text-primary" />
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
                            <FormLabel className="font-semibold text-gray-700">
                                Username
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter username"
                                    className="border-gray-300 focus:border-primary focus:ring-primary"
                                />
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
                            <FormLabel className="font-semibold text-gray-700">
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter full name"
                                    className="border-gray-300 focus:border-primary focus:ring-primary"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-gray-700">
                                Password
                            </FormLabel>
                            <FormControl>
                                <PasswordInput
                                    {...field}
                                    placeholder="Enter password"
                                    className="border-gray-300 focus:border-primary focus:ring-primary"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    disabled={isPending || isLoading}
                    className="w-full py-2 bg-primary hover:bg-primary/90 transition-colors duration-200"
                >
                    {isPending ? "Submitting..." : "Create Teacher"}
                </Button>
            </form>
        </Form>
    );
};
