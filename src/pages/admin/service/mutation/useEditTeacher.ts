import { useMutation } from "@tanstack/react-query";
import type { TeacherField } from "../../type";
import { request } from "@/config/request";

export const useEditTeacher = (teacherId: string) => {
    return useMutation({
        mutationFn: (data: TeacherField) =>
            request
                .patch(`/teacher/${teacherId}`, data)
                .then((res) => res.data),
    });
};
