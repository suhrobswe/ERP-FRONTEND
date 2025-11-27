import React from "react";
import { useTeachersList } from "../service/query/useTeachersList";
import { TeacherTable } from "../components/table";
import { Spinner } from "@/components/ui/spinner";

import type { Teacher } from "../type";
import { TeacherColumns } from "./teacher-columns-table";

export const Teachers = () => {
    const { data, isLoading } = useTeachersList();

    const teachers: Teacher[] = React.useMemo(() => {
        if (!Array.isArray(data?.data)) return [];
        return data.data.map((item, index) => ({
            groups: item.groups?.length || 0,
            id: item.id,
            count: index + 1,
            isActive: item.isActive ? "Active" : "Blocked",
            name: item.name,
            specification: item.specification,
            username: item.username,
        }));
    }, [data]);

    return (
        <div>
            {isLoading ? (
                <Spinner />
            ) : (
                <TeacherTable columns={TeacherColumns} data={teachers} />
            )}
        </div>
    );
};
