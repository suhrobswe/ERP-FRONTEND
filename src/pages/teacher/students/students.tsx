import { Switch } from "@/components/ui/switch";
import { useStudentList } from "../service/query/useStudentList";
import type { Student } from "../type";
import React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import profileImg from "../../../assets/profile.jpg";
import { TeacherTable } from "@/pages/admin/components/table";

export const Students = () => {
    const { data } = useStudentList();

    const navigate = useNavigate();

    console.log(data);

    const students: Student[] = React.useMemo(() => {
        if (!Array.isArray(data?.data?.data)) return [];

        console.log(data);

        return data.data.data.map((item: any, index: number) => ({
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

    return (
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
    );
};
