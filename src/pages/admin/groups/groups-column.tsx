import type { ColumnDef } from "@tanstack/react-table";
import type { GroupT } from "../type";
import { Button } from "@/components/ui/button";

export const GroupsColumn: ColumnDef<GroupT>[] = [
    {
        accessorKey: "count",
        header: "Count",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "teacher",
        header: "Teacher",
    },
    {
        accessorKey: "specification",
        header: "Specification",
    },
    {
        accessorKey: "lessonTime",
        header: "Lesson Time",
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
