import { useParams, useNavigate } from "react-router-dom";
import { useStudent } from "../service/query/useStudent";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import {
    Mail,
    Award,
    Calendar,
    Users,
    ChevronLeft,
    CheckCircle,
    Loader,
} from "lucide-react";
import React from "react";
import { useUpdateStudentLevel } from "../service/mutate/useUpdateStudentLevel";
import { useQueryClient } from "@tanstack/react-query";

export const StudentDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { data, isLoading } = useStudent(id as string);
    const { mutate: updateLevel, isPending } = useUpdateStudentLevel(
        id as string
    );
    const [selectedLevel, setSelectedLevel] = React.useState<number | null>(
        null
    );

    console.log(data);

    const handleUpdateLevel = () => {
        if (selectedLevel && selectedLevel !== student?.level) {
            updateLevel(selectedLevel as any, {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["student"] });
                    setSelectedLevel(null);
                },
            });
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spinner />
            </div>
        );
    }

    const student = data?.data || data;

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const levelColors: Record<
        number,
        { bg: string; text: string; label: string }
    > = {
        1: {
            bg: "from-blue-500 to-blue-600",
            text: "text-blue-400",
            label: "Beginner",
        },
        2: {
            bg: "from-green-500 to-green-600",
            text: "text-green-400",
            label: "Elementary",
        },
        3: {
            bg: "from-yellow-500 to-yellow-600",
            text: "text-yellow-400",
            label: "Intermediate",
        },
        4: {
            bg: "from-orange-500 to-orange-600",
            text: "text-orange-400",
            label: "Upper-Intermediate",
        },
        5: {
            bg: "from-red-500 to-red-600",
            text: "text-red-400",
            label: "Advanced",
        },
        6: {
            bg: "from-purple-500 to-purple-600",
            text: "text-purple-400",
            label: "Mastery",
        },
    };

    const levelInfo = levelColors[student?.level] || levelColors[1];

    return (
        <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 p-6">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-8 group"
            >
                <ChevronLeft
                    size={20}
                    className="group-hover:-translate-x-1 transition-transform"
                />
                <span className="font-medium cursor-pointer">Back</span>
            </button>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden backdrop-blur-sm mb-6">
                <div className={`h-32 bg-linear-to-r ${levelInfo.bg}`}></div>

                {/* Profile Content */}
                <div className="relative px-6 pb-6">
                    {/* Avatar */}
                    <div className="flex items-start gap-6 -mt-16 mb-6">
                        <div className="p-1 bg-slate-800 rounded-xl border border-slate-700">
                            {student?.avatarUrl ? (
                                <img
                                    src={student.avatarUrl}
                                    alt={student?.name}
                                    className="w-32 h-32 rounded-lg object-cover"
                                />
                            ) : (
                                <div
                                    className={`w-32 h-32 rounded-lg bg-linear-to-br ${levelInfo.bg} flex items-center justify-center`}
                                >
                                    <span className="text-4xl font-bold text-white">
                                        {getInitials(student?.name || "S")}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="flex-1 pt-4">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold text-white">
                                    {student?.name}
                                </h1>
                                {student?.isActive && (
                                    <CheckCircle
                                        size={24}
                                        className="text-green-400 drop-shadow-lg"
                                    />
                                )}
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <Award size={18} className="text-cyan-400" />
                                <span
                                    className={`text-sm font-bold ${levelInfo.text} uppercase tracking-wider`}
                                >
                                    Level {student?.level} - {levelInfo.label}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-700">
                                <label className="text-sm text-slate-400 uppercase tracking-wider font-medium">
                                    Update Level:
                                </label>
                                <select
                                    value={selectedLevel || ""}
                                    onChange={(e) => {
                                        const newLevel = parseInt(
                                            e.target.value
                                        );
                                        setSelectedLevel(newLevel);
                                    }}
                                    disabled={isPending}
                                    className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm font-medium hover:border-cyan-400 focus:border-cyan-400 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <option value="" disabled>
                                        Select Level
                                    </option>
                                    {[1, 2, 3, 4, 5].map((level) => (
                                        <option key={level} value={level}>
                                            Level {level} -{" "}
                                            {levelColors[level].label}
                                        </option>
                                    ))}
                                </select>
                                <Button
                                    onClick={handleUpdateLevel}
                                    disabled={
                                        isPending ||
                                        !selectedLevel ||
                                        selectedLevel === student?.level
                                    }
                                    className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium"
                                >
                                    {isPending ? (
                                        <>
                                            <Loader
                                                size={16}
                                                className="animate-spin mr-2"
                                            />
                                            Updating...
                                        </>
                                    ) : (
                                        "Update"
                                    )}
                                </Button>
                            </div>
                            <p className="text-slate-400 text-sm mt-2">
                                {student?.role?.charAt(0).toUpperCase() +
                                    student?.role?.slice(1)}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pt-4 border-t border-slate-700">
                        <div className="mt-4">
                            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
                                Status
                            </p>
                            <div className="flex items-center gap-2">
                                <div
                                    className={`w-2 h-2 rounded-full ${
                                        student?.isActive
                                            ? "bg-green-400"
                                            : "bg-red-400"
                                    }`}
                                ></div>
                                <span
                                    className={`text-sm font-medium ${
                                        student?.isActive
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    {student?.isActive ? "Active" : "Inactive"}
                                </span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
                                Joined
                            </p>
                            <p className="text-sm text-white font-medium">
                                {formatDate(student?.createdAt)}
                            </p>
                        </div>
                        <div className="mt-4">
                            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
                                Last Updated
                            </p>
                            <p className="text-sm text-white font-medium">
                                {formatDate(student?.updatedAt)}
                            </p>
                        </div>
                        <div className="mt-4">
                            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
                                Member ID
                            </p>
                            <p className="text-xs text-slate-300 font-mono truncate">
                                {id?.substring(0, 8)}...
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-linear-to-b from-cyan-400 to-cyan-600 rounded-full" />
                        Contact Information
                    </h2>
                    <div className="space-y-4">
                        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-700/50">
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-cyan-400" />
                                <div>
                                    <p className="text-slate-400 text-xs uppercase tracking-wider">
                                        Email
                                    </p>
                                    <p className="text-white font-medium break-all">
                                        {student?.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-linear-to-b from-purple-400 to-purple-600 rounded-full" />
                        Group Information
                    </h2>
                    <div className="space-y-4">
                        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-700/50">
                            <div className="flex items-center gap-3">
                                <Users size={18} className="text-purple-400" />
                                <div className="flex-1">
                                    <p className="text-slate-400 text-xs uppercase tracking-wider">
                                        Group Name
                                    </p>
                                    <p className="text-white font-medium">
                                        {student?.group?.name || "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {student?.group?.isActive && (
                            <div className="bg-slate-700/30 rounded-lg p-4 border border-green-500/30">
                                <div className="flex items-center gap-3">
                                    <CheckCircle
                                        size={18}
                                        className="text-green-400"
                                    />
                                    <p className="text-green-400 font-medium text-sm">
                                        Group is Active
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm mt-6">
                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-linear-to-b from-orange-400 to-orange-600 rounded-full" />
                    Timeline
                </h2>
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <Calendar size={20} className="text-orange-400" />
                            <div className="w-0.5 h-12 bg-slate-700 mt-2"></div>
                        </div>
                        <div className="pb-8">
                            <p className="text-slate-400 text-xs uppercase tracking-wider">
                                Created
                            </p>
                            <p className="text-white font-medium text-lg">
                                {formatDate(student?.createdAt)}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <Calendar size={20} className="text-orange-400" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-xs uppercase tracking-wider">
                                Last Updated
                            </p>
                            <p className="text-white font-medium text-lg">
                                {formatDate(student?.updatedAt)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
