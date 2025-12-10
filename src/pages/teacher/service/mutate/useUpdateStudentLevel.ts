import { request } from "@/config/request";
import { useMutation } from "@tanstack/react-query";

export const useUpdateStudentLevel = (id: string) => {
    return useMutation({
        mutationFn: (data) =>
            request.patch(`/student/level/${id}`, data).then((res) => res.data),
    });
};
