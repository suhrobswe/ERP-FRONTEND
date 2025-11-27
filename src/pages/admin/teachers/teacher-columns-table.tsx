import type { ColumnDef } from "@tanstack/react-table";
import type { Teacher } from "../type";
import { Button } from "@/components/ui/button";

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
    },
    {
        id: "actions",
        header: "Actions",
        cell: () => {
            // const teacher = row.original;
            return <Button>Edit</Button>;
        },
    },
];
