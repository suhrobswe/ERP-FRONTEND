import type { ColumnDef } from "@tanstack/react-table";
import type { Teacher } from "../type";
import { Button } from "@/components/ui/button";
// ✨ Switch komponentini import qiling (Sizning UI kutubxonangizdan)
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner"; // Holat o'zgarishini ko'rsatish uchun

// Agar sizda holatni o'zgartiruvchi mutatsiya mavjud bo'lsa, uni shu yerda import qilasiz.
// Masalan: import { useToggleTeacherStatus } from "../service/mutation/useToggleTeacherStatus";

export const TeacherColumns: ColumnDef<Teacher>[] = [
    {
        accessorKey: "count",
        header: "Count",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "specification",
        header: "Specification",
    },
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "groups",
        header: "Groups",
    },
    {
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) => {
            const teacher = row.original;
            const isChecked = teacher.isActive === "Active";

            const handleStatusChange = (newCheckedState: boolean) => {
                const newStatus = newCheckedState ? "Active" : "Blocked";

                toast.info(
                    `Teacher ${teacher.name} statusi ${newStatus} ga o'zgartirilmoqda...`
                );
            };

            return (
                <div className="flex items-center space-x-2">
                    <Switch
                        id={`status-toggle-${teacher.id}`}
                        checked={isChecked}
                        onCheckedChange={handleStatusChange}
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
                <Button onClick={() => console.log("Edit", teacher.id)}>
                    Edit
                </Button>
            );
        },
    },
];
