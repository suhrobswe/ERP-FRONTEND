import { request } from "@/config/request";
import { useMutation } from "@tanstack/react-query";

export const useUpdateActive = (id: string) => {
    return useMutation({
        mutationFn: (isActive: boolean) =>
            request
                .patch(`/teacher/status/${id}`, { isActive })
                .then((res) => res.data),
    });
};
