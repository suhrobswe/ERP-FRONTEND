import { useNavigate, useParams } from "react-router-dom";
import { useGroup } from "../service/query/useGroup";
import { TeacherTable } from "@/pages/admin/components/table";
import { Spinner } from "@/components/ui/spinner";
import React from "react";
import type { Student } from "../type";
import type { ColumnDef } from "@tanstack/react-table";
import { Switch } from "@/components/ui/switch";
import { Users, BookOpen, ChevronLeft } from "lucide-react";
import profileImg from "../../../assets/profile.jpg";

export const GroupDetail = () => {
    const { id } = useParams();
    const { data, isLoading } = useGroup(id as string);

    const navigate = useNavigate();

    const students: Student[] = React.useMemo(() => {
        if (!Array.isArray(data?.data?.students)) return [];

        console.log(data);

        return data.data.students.map((item: any, index: number) => ({
            id: item.id,
            name: item.name,
            email: item.email,
            isActive: item.isActive,
            count: index + 1,
            studentImg: item.avatarUrl,
        }));
    }, [data]);

    const studentsColumns: ColumnDef<Student>[] = [
        { accessorKey: "count", header: "Count" },

        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => {
                return (
                    <span
                        className="cursor-pointer hover:text-cyan-300 transition-colors underline-offset-2 hover:underline"
                        onClick={() =>
                            navigate(`/app/teacher/student/${row.original.id}`)
                        }
                    >
                        {row.original.name}
                    </span>
                );
            },
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => {
                return (
                    <span className="cursor-pointer hover:text-cyan-300 transition-colors underline-offset-2 hover:underline">
                        {row.original.email}
                    </span>
                );
            },
        },

        {
            header: "Image",
            cell: ({ row }) => (
                <>
                    <img
                        src={row.original.studentImg || profileImg}
                        alt={row.original.studentImg}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                </>
            ),
        },

        {
            accessorKey: "isActive",
            header: "Status",
            cell: ({ row }) => {
                const group = row.original;
                const isChecked = group.isActive ?? true;

                return (
                    <div className="flex items-center gap-3">
                        <Switch
                            checked={isChecked}
                            disabled
                            className={`
                                cursor-pointer transition-all duration-300 rounded-full
                                data-[state=checked]:bg-green-500
                                data-[state=unchecked]:bg-red-600
                                ${
                                    isChecked
                                        ? "shadow-lg shadow-green-400/40"
                                        : "shadow-lg shadow-red-400/40"
                                }
                            `}
                        />
                        <span
                            className={`text-sm font-medium transition-all duration-300 ${
                                isChecked ? "text-green-400" : "text-red-400"
                            }`}
                        >
                            {isChecked ? "Active" : "Blocked"}
                        </span>
                    </div>
                );
            },
        },
    ];

    const groupName = data?.data?.name || "Group";
    const totalStudents = students.length;

    return isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
            <Spinner />
        </div>
    ) : (
        <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 p-6">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-8 group"
            >
                <ChevronLeft
                    size={20}
                    className="group-hover:-translate-x-1 transition-transform"
                />
                <span className="font-medium">Back</span>
            </button>

            <div className="mb-8">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-linear-to-br from-cyan-500/20 to-cyan-600/10 rounded-lg border border-cyan-500/30 backdrop-blur-sm">
                            <BookOpen
                                size={28}
                                className="text-cyan-400 drop-shadow-lg"
                            />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-white drop-shadow-sm">
                                {groupName}
                            </h1>
                            <p className="text-slate-400 text-sm mt-1">
                                Group Details & Management
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-linear-to-br from-slate-800 to-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm mb-2 uppercase tracking-wider">
                                    Total Members
                                </p>
                                <p className="text-4xl font-bold text-white">
                                    {totalStudents}
                                </p>
                            </div>
                            <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                                <Users
                                    size={32}
                                    className="text-cyan-400 drop-shadow-lg"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-linear-to-br from-slate-800 to-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm hover:border-green-500/30 transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm mb-2 uppercase tracking-wider">
                                    Active Students
                                </p>
                                <p className="text-4xl font-bold text-green-400">
                                    {students.filter((s) => s.isActive).length}
                                </p>
                            </div>
                            <div className="relative w-16 h-16 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                                <div className="text-2xl font-bold text-green-400">
                                    {Math.round(
                                        totalStudents === 0
                                            ? 0
                                            : (students.filter(
                                                  (s) => s.isActive
                                              ).length /
                                                  totalStudents) *
                                                  100
                                    )}
                                    %
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden backdrop-blur-sm shadow-2xl">
                <div className="p-6 border-b border-slate-700 bg-slate-800/80">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="w-1 h-6 bg-linear-to-b from-cyan-400 to-cyan-600 rounded-full" />
                        Students List
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <TeacherTable columns={studentsColumns} data={students} />
                </div>
            </div>
        </div>
    );
};
