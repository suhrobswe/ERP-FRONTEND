import React, { useState } from "react";
import { useGroupsList } from "../service/query/useGroupsList";
import type { GroupT, IGroup, IResponse } from "../type";
import { Spinner } from "@/components/ui/spinner";
import { TeacherTable } from "../components/table";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useUpdateGroupStatus } from "../service/mutation/useUpdateGroupStatus";
import { useQueryClient } from "@tanstack/react-query";
import { useToggle } from "@/hooks/useToggle";

export const Groups = () => {
    const { data, isLoading } = useGroupsList<IResponse<IGroup>>();

    const navigate = useNavigate();

    const { close, isOpen, open } = useToggle();

    const client = useQueryClient();

    const [_editId, _setEditId] = useState("");
    const [_openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [_deleteId, setDeleteId] = useState("");

    const groups: GroupT[] = React.useMemo(() => {
        if (!Array.isArray(data?.data)) return [];

        return data.data.map((item, index) => ({
            count: index + 1,
            id: item.id, // Group id
            name: item.name,
            teacher: item.teacher?.name ?? "N/A",
            teacherId: item.teacher?.id ?? "",
            teacherImg: item.teacher?.avatarUrl ?? "",
            studentCount: Array.isArray(item.students)
                ? item.students.length
                : 0,
            isActive: item.isActive ? "Active" : "Blocked",
            index: index + 1,
            startTime: item.startTime?.slice(0, 5) ?? "00:00",
            endTime: item.endTime?.slice(0, 5) ?? "00:00",
        }));
    }, [data]);

    if (isLoading) return <p>Loading...</p>;

    const GroupsColumn: ColumnDef<GroupT>[] = [
        {
            accessorKey: "count",
            header: "Count",
        },
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => {
                return (
                    <span
                        className="cursor-pointer hover:text-cyan-300 transition-colors underline-offset-2 hover:underline"
                        onClick={() => {
                            navigate(`/app/admin/group/${row.original.id}`);
                        }}
                    >
                        {row.original.name}
                    </span>
                );
            },
        },
        {
            accessorKey: "teacher",
            header: "Teacher",
            cell: ({ row }) => {
                return (
                    <span
                        className="cursor-pointer hover:text-cyan-300 transition-colors underline-offset-2 hover:underline"
                        onClick={() => {
                            navigate(
                                `/app/admin/teacher/${row.original.teacherId}`
                            );
                        }}
                    >
                        {row.original.teacher}
                    </span>
                );
            },
        },

        {
            header: "Teacher Image",
            cell: ({ row }) => (
                <>
                    <img
                        src={row.original.teacherImg}
                        alt={row.original.teacher}
                        className="w-12 h-12 rounded-full object-cover"
                        onClick={() => {
                            navigate(
                                `/app/admin/teacher/${row.original.teacherId}`
                            );
                        }}
                    />
                </>
            ),
        },

        {
            accessorKey: "startTime",
            header: "Start Time",
        },
        {
            accessorKey: "endTime",
            header: "End Time",
        },
        {
            accessorKey: "isActive",
            header: "Status",
            cell: ({ row }) => {
                const group = row.original;
                const isChecked = group.isActive === "Active";
                const updateStatus = useUpdateGroupStatus(String(group.id));

                const handleChange = (state: boolean) => {
                    toast.info("Updating teacher status...");
                    updateStatus.mutate(state, {
                        onSuccess: () => {
                            toast.success("Status updated!");
                            client.invalidateQueries({
                                queryKey: ["groups"],
                            });
                        },
                        onError: () => toast.error("Error occurred!"),
                    });
                };

                return (
                    <div className="flex items-center gap-3">
                        <Switch
                            checked={isChecked}
                            disabled={updateStatus.isPending}
                            onCheckedChange={handleChange}
                            className={`
            cursor-pointer transition-all duration-300 rounded-full

            // Track Colors
            data-[state=checked]:bg-green-500
            data-[state=unchecked]:bg-red-600

            // Shadow animatsiya
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
        {
            id: "actions",
            header: "",
            cell: ({ row }) => {
                const teacher = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 hover:bg-gray-800 rounded-md"
                            >
                                <MoreHorizontal className="h-4 w-4 text-gray-300" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="bg-black border border-gray-800 text-gray-200 shadow-xl cursor-pointer"
                        >
                            <DropdownMenuItem
                                onClick={() =>
                                    navigate(`/app/admin/group/${teacher.id}`)
                                }
                                className="cursor-pointer hover:bg-gray-800"
                            >
                                View Details
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                onClick={() => {
                                    setDeleteId(String(teacher.id));
                                    setOpenDeleteDialog(true);
                                }}
                                className="cursor-pointer hover:bg-red-900/50 text-red-400"
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    return (
        <>
            <div>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <TeacherTable columns={GroupsColumn} data={groups} />
                )}
            </div>

            <div className="flex justify-end">
                <Button
                    onClick={open}
                    className="cursor-pointer flex items-center gap-2 bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white px-5 py-2 shadow-xl rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                    <UserIcon className="w-5 h-5" /> Add Group
                </Button>
            </div>
        </>
    );
};
