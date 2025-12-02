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
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TeacherFormWrapper } from "../components/teacher-form-wrapper";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useDeleteTeacher } from "../service/mutation/useDeleteTeacher";

export const Teachers = () => {
    const { data, isLoading } = useTeachersList();
    const { close, isOpen, open } = useToggle();
    const { close: close2, isOpen: isOpen2, open: open2 } = useToggle();
    const queryClient = useQueryClient();
    const [editId, setEditId] = useState("");
    const [deleteId, setDeleteId] = useState(""); // delete uchun id state
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
        { accessorKey: "count", header: "Count" },
        { accessorKey: "name", header: "Name" },
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

                const editTeacher = () => {
                    if (teacher.id) {
                        setEditId(teacher.id);
                        open2();
                    }
                };

                const openDelete = () => {
                    setDeleteId(String(teacher.id));
                    setOpenDeleteDialog(true);
                };

                return (
                    <>
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                className="cursor-pointer"
                                asChild
                            >
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    onClick={() =>
                                        navigate(
                                            `/app/admin/teacher/${teacher.id}`
                                        )
                                    }
                                >
                                    View details
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    onClick={editTeacher}
                                >
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    onClick={openDelete}
                                >
                                    <p className="text-red-600">Delete</p>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                );
            },
        },
    ];

    const closeEditModal = () => {
        setEditId("");
        close2();
    };

    const handleDeleteConfirm = () => {
        deleteTeacherMutation.mutate(undefined, {
            onSuccess: () => {
                toast.success("Teacher deleted successfully");
                queryClient.invalidateQueries({ queryKey: ["teacher_list"] });
                setOpenDeleteDialog(false);
            },
            onError: () => toast.error("Error deleting teacher"),
        });
    };

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
                                    <TeacherForm closeModal={close} />
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                    <Dialog onOpenChange={closeEditModal} open={isOpen2}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Teacher Edit</DialogTitle>
                                <DialogDescription>
                                    <TeacherFormWrapper
                                        closeEditModal={closeEditModal}
                                        id={editId}
                                    />
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                    <AlertDialog
                        open={openDeleteDialog}
                        onOpenChange={setOpenDeleteDialog}
                    >
                        <AlertDialogContent className="max-w-sm mx-auto bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                            <AlertDialogHeader className="text-center">
                                <AlertDialogTitle className="text-lg font-bold text-gray-800">
                                    Delete Teacher
                                </AlertDialogTitle>
                                <p className="mt-2 text-sm text-gray-500">
                                    Are you sure you want to delete this
                                    teacher? This action cannot be undone.
                                </p>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="mt-6 flex justify-end space-x-3">
                                <AlertDialogCancel className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer transition">
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 cursor-pointer transition"
                                    onClick={handleDeleteConfirm}
                                >
                                    {deleteTeacherMutation.isPending
                                        ? "Deleting..."
                                        : "Delete"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <Button onClick={open} className="mb-5">
                        Create
                    </Button>

                    <TeacherTable columns={teachersColumn} data={teachers} />
                </>
            )}
        </div>
    );
};
