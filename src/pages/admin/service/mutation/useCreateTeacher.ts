import { request } from "@/config/request";
import { useMutation } from "@tanstack/react-query";
import type { TeacherField } from "../../type";

export const useCreateTeacher = () => {
    return useMutation({
        mutationFn: (data: TeacherField) =>
            request.post("/teacher", data).then((res) => res.data),
    });
};
