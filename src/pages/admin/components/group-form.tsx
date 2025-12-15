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
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useTeachersList } from "../service/query/useTeachersList";
import { useCreateGroup } from "../service/mutation/useCreateGroup";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const groupFormSchema = z.object({
    name: z.string().min(1, "Group name is required"),
    teacherId: z.string().min(1, "Teacher is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
});

type GroupFormInput = z.infer<typeof groupFormSchema>;

interface GroupFormProps {
    closeModal?: () => void;
}

export const GroupForm = ({ closeModal }: GroupFormProps) => {
    const form = useForm<GroupFormInput>({
        resolver: zodResolver(groupFormSchema),
        defaultValues: {
            name: "",
            teacherId: "",
            startTime: "",
            endTime: "",
        },
    });

    const { data: teachersData, isLoading } = useTeachersList();
    const teachers = teachersData?.data || [];
    const client = useQueryClient();
    const { mutate, isPending } = useCreateGroup();

    const onSubmit = (data: GroupFormInput) => {
        mutate(data as any, {
            onSuccess: (res) => {
                toast.success(res.message.en || "Group created!");
                client.invalidateQueries({ queryKey: ["group_list"] });
                form.reset();
                closeModal?.();
            },
            onError: () => toast.error("Error creating group!"),
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5 p-8 rounded-xl bg-linear-to-br from-slate-900/60 to-black/40 border border-gray-700 backdrop-blur-lg shadow-xl"
            >
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-200 font-semibold">
                                Group Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter group name..."
                                    className="bg-black/40 border-gray-700 text-white placeholder-gray-400 focus:ring-cyan-500"
                                />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                        </FormItem>
                    )}
                />

                <FormField
                    name="teacherId"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-200 font-semibold">
                                Teacher
                            </FormLabel>
                            <FormControl>
                                <select
                                    {...field}
                                    className="w-full bg-black/40 border-gray-700 text-white p-2 rounded-md focus:ring-cyan-500"
                                >
                                    <option value="">Select teacher...</option>
                                    {isLoading ? (
                                        <option disabled>Loading...</option>
                                    ) : (
                                        teachers.map((teacher) => (
                                            <option
                                                key={teacher.id}
                                                value={teacher.id}
                                            >
                                                {teacher.name}
                                            </option>
                                        ))
                                    )}
                                </select>
                            </FormControl>
                            <FormMessage className="text-red-400" />
                        </FormItem>
                    )}
                />

                <FormField
                    name="startTime"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-200 font-semibold">
                                Start Time
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="datetime-local"
                                    {...field}
                                    className="bg-black/40 border-gray-700 text-white placeholder-gray-400 focus:ring-cyan-500"
                                />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                        </FormItem>
                    )}
                />

                <FormField
                    name="endTime"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-200 font-semibold">
                                End Time
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="datetime-local"
                                    {...field}
                                    className="bg-black/40 border-gray-700 text-white placeholder-gray-400 focus:ring-cyan-500"
                                />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="cursor-pointer w-full mt-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-200 flex justify-center items-center gap-2"
                    disabled={isPending}
                >
                    Create Group
                </Button>
            </form>
        </Form>
    );
};
