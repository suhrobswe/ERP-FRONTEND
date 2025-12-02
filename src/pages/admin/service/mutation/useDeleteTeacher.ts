import { request } from "@/config/request";
import { useMutation } from "@tanstack/react-query";

export const useDeleteTeacher = (id: string) => {
    return useMutation({
        mutationFn: () =>
            request.delete(`/teacher/${id}`).then((res) => res.data),
    });
};
