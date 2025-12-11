import React from "react";
import { useGroupList } from "../service/query/useGroupList";
import type { GroupSummary } from "../type";
import type { ColumnDef } from "@tanstack/react-table";
import { Spinner } from "@/components/ui/spinner";
import { TeacherTable } from "@/pages/admin/components/table";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";

export const Group = () => {
    const { data, isLoading } = useGroupList();

    const navigate = useNavigate();

    const groups: GroupSummary[] = React.useMemo(() => {
        if (!Array.isArray(data?.data)) return [];

        return data.data.map((item: any, index: any) => ({
            id: item.id,
            name: item.name,
            studentsCount: item.students.length,
            isActive: item.isActive,
            count: index + 1,
            startTime: item.startTime.slice(0, 5),
            endTime: item.endTime.slice(0, 5),
            durationInMonths: item.durationInMonths,
        }));
    }, [data]);

    const groupColumns: ColumnDef<GroupSummary>[] = [
        { accessorKey: "count", header: "Count" },
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => {
                return (
                    <span
                        className="cursor-pointer hover:text-cyan-300 transition-colors underline-offset-2 hover:underline"
                        onClick={() =>
                            navigate(`/app/teacher/group/for-teacher/${row.original.id}`)
                        }
                    >
                        {row.original.name}
                    </span>
                );
            },
        },
        { accessorKey: "studentsCount", header: "Students" },
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
        { accessorKey: "startTime", header: "Start Time" },
        { accessorKey: "endTime", header: "End Time" },
        { accessorKey: "durationInMonths", header: "Duration In Months" },
    ];

    return isLoading ? (
        <Spinner />
    ) : (
        <div className="space-y-5">
            <TeacherTable columns={groupColumns} data={groups} />
        </div>
    );
};
