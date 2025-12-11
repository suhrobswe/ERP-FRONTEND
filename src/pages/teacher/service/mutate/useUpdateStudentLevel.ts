import { request } from "@/config/request";
import { useMutation } from "@tanstack/react-query";

export const useUpdateStudentLevel = (id: string) => {
    return useMutation({
        mutationFn: (level: number) =>
            request
                .patch(`/student/level/${id}`, { level })
                .then((res) => res.data),
    });
};
