import React, { useState } from "react";
import { useTeachersList } from "../service/query/useTeachersList";
import { TeacherTable } from "../components/table";
import { Spinner } from "@/components/ui/spinner";
import type { ColumnDef } from "@tanstack/react-table";
import type { Teacher } from "../type";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useToggle } from "@/hooks/useToggle";
import { TeacherForm } from "../components/teacher-form";
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
import { MoreHorizontal, UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TeacherFormWrapper } from "../components/teacher-form-wrapper";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
} from "@/components/ui/alert-dialog";

import { useDeleteTeacher } from "../service/mutation/useDeleteTeacher";

export const Teachers = () => {
    const { data, isLoading } = useTeachersList();
    const { close, isOpen, open } = useToggle();
    const { close: close2, isOpen: isOpen2, open: open2 } = useToggle();
    const queryClient = useQueryClient();
    const [editId, setEditId] = useState("");
    const [deleteId, setDeleteId] = useState("");
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const navigate = useNavigate();
    const deleteTeacherMutation = useDeleteTeacher(deleteId);

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
        { accessorKey: "count", header: "№" },
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => (
                <span
                    className="cursor-pointer hover:text-cyan-300 transition-colors underline-offset-2 hover:underline"
                    onClick={() =>
                        navigate(
                            `/app/admin/teachers/detail/${row.original.id}`
                        )
                    }
                >
                    {row.original.name}
                </span>
            ),
        },
        { accessorKey: "specification", header: "Specialization" },
        {
            accessorKey: "username",
            header: "Username",
            cell: ({ row }) => (
                <span
                    className="cursor-pointer hover:text-cyan-300 transition-colors underline-offset-2 hover:underline"
                    onClick={() =>
                        navigate(
                            `/app/admin/teachers/detail/${row.original.id}`
                        )
                    }
                >
                    {row.original.username}
                </span>
            ),
        },
        { accessorKey: "groups", header: "Groups" },
        {
            accessorKey: "isActive",
            header: "Status",
            cell: ({ row }) => {
                const teacher = row.original;
                const isChecked = teacher.isActive === "Active";
                const updateStatus = useUpdateActive(String(teacher.id));

                const handleChange = (state: boolean) => {
                    toast.info("Updating teacher status...");
                    updateStatus.mutate(state, {
                        onSuccess: () => {
                            toast.success("Status updated!");
                            queryClient.invalidateQueries({
                                queryKey: ["teacher_list"],
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
                                    navigate(
                                        `/app/admin/teachers/detail/${teacher.id}`
                                    )
                                }
                                className="cursor-pointer hover:bg-gray-800"
                            >
                                View Details
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                className="cursor-pointer hover:bg-gray-800"
                                onClick={() => {
                                    setEditId(String(teacher.id));
                                    open2();
                                }}
                            >
                                Edit
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

    return isLoading ? (
        <Spinner />
    ) : (
        <div className="space-y-5">
            {/* MODALS */}
            <Dialog onOpenChange={close} open={isOpen}>
                <DialogContent className="bg-black text-gray-200 border border-gray-800 backdrop-blur-xl shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-blue-400">
                            Create Teacher
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        <TeacherForm closeModal={close} />
                    </DialogDescription>
                </DialogContent>
            </Dialog>

            <Dialog onOpenChange={() => close2()} open={isOpen2}>
                <DialogContent className="bg-black text-gray-200 border border-gray-800 backdrop-blur-xl shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-yellow-400">
                            Edit Teacher
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        <TeacherFormWrapper
                            closeEditModal={() => close2()}
                            id={editId}
                        />
                    </DialogDescription>
                </DialogContent>
            </Dialog>

            {/* DELETE CONFIRM MODAL */}
            <AlertDialog
                open={openDeleteDialog}
                onOpenChange={setOpenDeleteDialog}
            >
                <AlertDialogContent className="bg-black border border-gray-800 shadow-xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-red-500 text-lg font-bold">
                            Delete Confirmation
                        </AlertDialogTitle>
                        <p className="text-gray-300 mt-2">
                            Are you sure? This action cannot be undone.
                        </p>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel className="bg-gray-900 hover:bg-gray-700 text-white cursor-pointer">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                            onClick={() =>
                                deleteTeacherMutation.mutate(undefined, {
                                    onSuccess: () => {
                                        toast.success("Teacher deleted!");
                                        setOpenDeleteDialog(false);
                                        queryClient.invalidateQueries({
                                            queryKey: ["teacher_list"],
                                        });
                                    },
                                })
                            }
                        >
                            {deleteTeacherMutation.isPending
                                ? "Deleting..."
                                : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* TABLE */}
            <TeacherTable columns={teachersColumn} data={teachers} />

            {/* CREATE BUTTON */}
            <div className="flex justify-end">
                <Button
                    onClick={open}
                    className="cursor-pointer flex items-center gap-2 bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white px-5 py-2 shadow-xl rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                    <UserIcon className="w-5 h-5" /> Add Teacher
                </Button>
            </div>
        </div>
    );
};
