import React from "react";
import { useTeachersList } from "../service/query/useTeachersList";
import { TeacherTable } from "../components/table";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { TeacherColumns } from "./teacher-columns-table";

import type { Teacher } from "../type";
import { useToggle } from "@/hooks/useToggle";
import { TeacherForm } from "../components/teacher-create-form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export const Teachers = () => {
    const { data, isLoading } = useTeachersList();
    const { close, isOpen, open } = useToggle();

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

                    <TeacherTable columns={TeacherColumns} data={teachers} />
                </>
            )}
        </div>
    );
};
