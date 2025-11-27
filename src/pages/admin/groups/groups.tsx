import React from "react";
import { useGroupsList } from "../service/query/useGroupsList";
import type { GroupT, IResponse, IGroup } from "../type";
import { Spinner } from "@/components/ui/spinner";
import { TeacherTable } from "../components/table";
import { GroupsColumn } from "./groups-column";

export const Groups = () => {
    const { data, isLoading } = useGroupsList<IResponse<IGroup>>();

    const groups: GroupT[] = React.useMemo(() => {
        if (!Array.isArray(data?.data)) return [];

        return data.data.map((item, index) => ({
            count: index + 1,
            id: item.id,
            name: item.name,
            teacher: item.teacher?.name || "N/A",
            specification: item.teacher?.specification || "-",
            studentCount: item.students?.length || 0,
            isActive: item.isActive ? "Active" : "Blocked",
            index: index + 1,
            lessonTime: item.lessonTime,
        }));
    }, [data]);

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            {isLoading ? (
                <Spinner />
            ) : (
                <TeacherTable columns={GroupsColumn} data={groups} />
            )}
        </div>
    );
};
