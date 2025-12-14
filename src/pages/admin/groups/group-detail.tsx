"use client";

import { Spinner } from "@/components/ui/spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useGroup } from "../service/query/useGroup";
import { Switch } from "@/components/ui/switch";
import { useUpdateGroupStatus } from "../service/mutation/useUpdateGroupStatus";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type {
    Key,
    ReactElement,
    JSXElementConstructor,
    ReactNode,
    ReactPortal,
} from "react";
import { ArrowLeft } from "lucide-react";

export const GroupDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const client = useQueryClient();

    const { data, isLoading } = useGroup(id);

    if (isLoading) return <Spinner />;

    // @ts-ignore
    const group = data?.data;

    if (!group) return <p className="text-red-400">Group not found</p>;

    const updateStatus = useUpdateGroupStatus(group.id);

    const handleStatusChange = (state: boolean) => {
        if (!group) return;

        // 1. Darhol UI update qilamiz
        group.isActive = state;

        // 2. Backendga yuboramiz
        toast.info("Updating group status...");
        updateStatus.mutate(state, {
            onSuccess: () => {
                toast.success("Status updated!");
                client.invalidateQueries({ queryKey: ["groupById", id] });
            },
            onError: () => {
                toast.error("Error occurred!");
                // xato bo'lsa, oldingi state ni tiklaymiz
                group.isActive = !state;
                client.invalidateQueries({ queryKey: ["groupById", id] });
            },
        });
    };

    return (
        <div className="min-h-screen bg-[#050505] px-5 py-10">
            <div className="max-w-5xl mx-auto space-y-10">
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#1a1a1a] bg-[#0b0b0b] text-gray-300 hover:text-white hover:bg-[#131313] transition-all duration-300 hover:scale-[1.03] shadow-md"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>

                <div className="border border-[#1e1e1e] rounded-2xl bg-[#0e0e0e] shadow-[0_0_30px_rgba(0,0,0,0.45)] overflow-hidden backdrop-blur-md p-8">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        {group.name}
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div>
                            <span className="text-gray-400 block">
                                Start Time
                            </span>
                            <p className="text-white">{group.startTime}</p>
                        </div>
                        <div>
                            <span className="text-gray-400 block">
                                End Time
                            </span>
                            <p className="text-white">{group.endTime}</p>
                        </div>
                        <div>
                            <span className="text-gray-400 block">
                                Duration
                            </span>
                            <p className="text-white">
                                {group.durationInMonths} months
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <img
                            src={group.teacher.avatarUrl ?? ""}
                            alt={group.teacher.name ?? "Teacher"}
                            className="w-16 h-16 rounded-full object-cover border border-gray-700"
                        />
                        <div>
                            <span className="text-gray-400 block">Teacher</span>
                            <p className="text-white font-medium">
                                {group.teacher.name}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6 items-center">
                        <div>
                            <span className="text-gray-400 block">
                                Students
                            </span>
                            <p className="text-white">
                                {group.students?.length ?? 0}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Switch
                                checked={group.isActive}
                                disabled={updateStatus.isPending}
                                onCheckedChange={handleStatusChange}
                                className={`
                                    cursor-pointer transition-all duration-300 rounded-full
                                    data-[state=checked]:bg-green-500
                                    data-[state=unchecked]:bg-red-600
                                    ${
                                        group.isActive
                                            ? "shadow-lg shadow-green-400/40"
                                            : "shadow-lg shadow-red-400/40"
                                    }
                                `}
                            />
                            <span
                                className={`text-sm font-medium transition-all duration-300 ${
                                    group.isActive
                                        ? "text-green-400"
                                        : "text-red-400"
                                }`}
                            >
                                {group.isActive ? "Active" : "Blocked"}
                            </span>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-white mb-2">
                            Students List
                        </h2>
                        {group.students?.length === 0 ? (
                            <p className="text-gray-400">
                                No students enrolled yet.
                            </p>
                        ) : (
                            <ul className="list-disc list-inside text-gray-200">
                                {group?.students?.map(
                                    (s: {
                                        id: Key | null | undefined;
                                        name:
                                            | string
                                            | number
                                            | bigint
                                            | boolean
                                            | ReactElement<
                                                  unknown,
                                                  | string
                                                  | JSXElementConstructor<any>
                                              >
                                            | Iterable<ReactNode>
                                            | ReactPortal
                                            | Promise<
                                                  | string
                                                  | number
                                                  | bigint
                                                  | boolean
                                                  | ReactPortal
                                                  | ReactElement<
                                                        unknown,
                                                        | string
                                                        | JSXElementConstructor<any>
                                                    >
                                                  | Iterable<ReactNode>
                                                  | null
                                                  | undefined
                                              >
                                            | null
                                            | undefined;
                                    }) => (
                                        <li key={s.id}>{s.name}</li>
                                    )
                                )}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
