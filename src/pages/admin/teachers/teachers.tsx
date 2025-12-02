import React from "react";
import { useTeachersList } from "../service/query/useTeachersList";
import { TeacherTable } from "../components/table";
import { Spinner } from "@/components/ui/spinner";
import type { ColumnDef } from "@tanstack/react-table";
import type { Teacher } from "../type";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useToggle } from "@/hooks/useToggle";
import { TeacherForm } from "../components/teacher-create-form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateActive } from "../service/mutation/useUpdateActive";
import { useQueryClient } from "@tanstack/react-query";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Teachers = () => {
    const { data, isLoading } = useTeachersList();
    const { close, isOpen, open } = useToggle();
    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const teachers: Teacher[] = React.useMemo(() => {
        if (!Array.isArray(data?.data)) return [];
        return data.data.map((item, index) => ({
            groups: item.groups?.length || 0,
            id: item.id,
            count: index + 1,
            isActive: item.isActive ? "Active" : "Blocked",
            name: item.name,
            specification: Array.isArray(item.specifications)
                ? item.specifications.map((s) => s.name).join(", ")
                : item.specifications?.name || "not yet",
            username: item.username,
        }));
    }, [data]);

    const teachersColumn: ColumnDef<Teacher>[] = [
        { accessorKey: "count", header: "Count" },
        {
            accessorKey: "name",
            header: "Name",
        },
        { accessorKey: "specification", header: "Specification" },
        { accessorKey: "username", header: "Username" },
        { accessorKey: "groups", header: "Groups" },
        {
            accessorKey: "isActive",
            header: "Status",
            cell: ({ row }) => {
                const teacher = row.original;
                const isChecked = teacher.isActive === "Active";

                const updateStatus = useUpdateActive(String(teacher.id));

                const handleStatusChange = (newCheckedState: boolean) => {
                    toast.info(
                        `Teacher ${teacher.name} statusi ${
                            newCheckedState ? "Active" : "Blocked"
                        } ga o'zgartirilmoqda...`
                    );

                    updateStatus.mutate(newCheckedState, {
                        onSuccess: () => {
                            toast.success(
                                "Status muvaffaqiyatli o'zgartirildi!"
                            );
                            queryClient.invalidateQueries({
                                queryKey: ["teacher_list"],
                            });
                        },
                        onError: () => {
                            toast.error("Xatolik yuz berdi!");
                        },
                    });
                };

                return (
                    <div className="flex items-center space-x-2">
                        <Switch
                            className="cursor-pointer"
                            id={`status-toggle-${teacher.id}`}
                            checked={isChecked}
                            onCheckedChange={handleStatusChange}
                            disabled={updateStatus.isPending}
                        />
                        <label
                            htmlFor={`status-toggle-${teacher.id}`}
                            className="text-sm font-medium"
                        >
                            {isChecked ? "ON" : "OFF"}
                        </label>
                    </div>
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const teacher = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() =>
                                    navigate(`/app/admin/teacher/${teacher.id}`)
                                }
                            >
                                View profile
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    return (
        <div>
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <Dialog onOpenChange={close} open={isOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Teacher Create</DialogTitle>
                                <DialogDescription>
                                    Fill in details to create a teacher.
                                </DialogDescription>
                            </DialogHeader>

                            <TeacherForm closeModal={close} />
                        </DialogContent>
                    </Dialog>

                    <Button onClick={open} className="mb-5">
                        Create
                    </Button>

                    <TeacherTable columns={teachersColumn} data={teachers} />
                </>
            )}
        </div>
    );
};
